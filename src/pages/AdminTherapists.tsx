import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Upload,
  Star,
  Calendar,
  Phone,
  Mail,
  Globe,
  Award,
  Clock,
  ImageIcon,
  Heart,
  XCircle,
} from "lucide-react";
import api, { Therapist } from "@/lib/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const INITIAL_FORM_STATE: Partial<Therapist> = {
  name: "",
  title: "",
  specialties: [],
  experience: "",
  bio: "",
  email: "",
  phone: "",
  languages: [],
  rating: 0,
  reviewCount: 0,
  bookingCount: 0,
  isActive: true,
  isFeatured: false,
};

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const COMMON_SPECIALTIES = [
  "Swedish Massage",
  "Deep Tissue Massage",
  "Hot Stone Therapy",
  "Aromatherapy",
  "Sports Massage",
  "Thai Massage",
  "Reflexology",
  "Prenatal Massage",
  "Trigger Point Therapy",
  "Lymphatic Drainage",
  "Cupping Therapy",
  "Myofascial Release",
];

const COMMON_LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Cantonese",
  "Tamil",
  "Hindi",
  "Arabic",
  "Japanese",
  "Korean",
];

const AdminTherapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [formData, setFormData] = useState<Partial<Therapist>>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getProfilePicUrl = (pic?: string) => {
    if (!pic) return null;
    if (pic.startsWith("http")) return pic;
    const baseUrl = API_URL.replace("/api", "");
    return `${baseUrl}/${pic.replace(/^\/+/, "")}`;
  };

  const fetchTherapists = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getTherapists({
        search: searchTerm || undefined,
        active: undefined,
      });
      if (response.success && response.data) {
        setTherapists(response.data);
      } else {
        setError(response.message || "Failed to fetch therapists");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchTherapists();
  }, [fetchTherapists]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
    setModalMode("add");
    setSelectedTherapist(null);
    setProfilePicPreview(null);
    setProfilePicFile(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setFormData({
      ...therapist,
      specialties: therapist.specialties || [],
      languages: therapist.languages || [],
      availability: therapist.availability || [],
    });
    if (therapist.profilePic) {
      setProfilePicPreview(getProfilePicUrl(therapist.profilePic) || null);
    }
    setModalMode("edit");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFormErrors((prev) => ({ ...prev, profilePic: "Please select an image file" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, profilePic: "Image must be less than 5MB" }));
        return;
      }
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
      setFormErrors((prev) => ({ ...prev, profilePic: "" }));
    }
  };

  const removeProfilePic = () => {
    setProfilePicFile(null);
    setProfilePicPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name?.trim()) errors.name = "Name is required";
    if (!formData.title?.trim()) errors.title = "Title is required";
    if (!formData.experience?.trim()) errors.experience = "Experience is required";
    if (!formData.bio?.trim()) errors.bio = "Bio is required";
    if (!formData.specialties || formData.specialties.length === 0) {
      errors.specialties = "At least one specialty is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      const data = new FormData();
      data.append("name", formData.name || "");
      data.append("title", formData.title || "");
      data.append("experience", formData.experience || "");
      data.append("bio", formData.bio || "");
      data.append("specialties", JSON.stringify(formData.specialties || []));
      data.append("languages", JSON.stringify(formData.languages || []));
      if (formData.email) data.append("email", formData.email);
      if (formData.phone) data.append("phone", formData.phone);
      if (formData.rating !== undefined) data.append("rating", formData.rating.toString());
      if (formData.reviewCount !== undefined) data.append("reviewCount", formData.reviewCount.toString());
      if (formData.bookingCount !== undefined) data.append("bookingCount", formData.bookingCount.toString());
      data.append("isActive", formData.isActive?.toString() || "true");
      data.append("isFeatured", formData.isFeatured?.toString() || "false");

      if (profilePicFile) {
        data.append("profilePic", profilePicFile);
      }

      let response;
      if (modalMode === "edit" && selectedTherapist) {
        response = await api.updateTherapist(selectedTherapist._id, data);
      } else {
        response = await api.createTherapist(data);
      }

      if (response.success) {
        setSuccess(`Therapist ${modalMode === "edit" ? "updated" : "created"} successfully`);
        closeModal();
        fetchTherapists();
      } else {
        setError(response.message || `Failed to ${modalMode === "edit" ? "update" : "create"} therapist`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.deleteTherapist(id);
      if (response.success) {
        setSuccess("Therapist deleted successfully");
        fetchTherapists();
      } else {
        setError(response.message || "Failed to delete therapist");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeleteConfirm(null);
      setLoading(false);
    }
  };

  const handleToggleStatus = async (therapist: Therapist) => {
    try {
      const response = await api.toggleTherapistStatus(therapist._id);
      if (response.success) {
        setSuccess(`Therapist ${therapist.isActive ? "deactivated" : "activated"} successfully`);
        fetchTherapists();
      } else {
        setError(response.message || "Failed to update therapist status");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleToggleFeatured = async (therapist: Therapist) => {
    try {
      const response = await api.toggleTherapistFeatured(therapist._id);
      if (response.success) {
        setSuccess(`Therapist ${therapist.isFeatured ? "removed from" : "added to"} featured successfully`);
        fetchTherapists();
      } else {
        setError(response.message || "Failed to update featured status");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties?.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...(prev.specialties || []), specialty],
    }));
    if (formErrors.specialties) {
      setFormErrors((prev) => ({ ...prev, specialties: "" }));
    }
  };

  const toggleLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages?.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...(prev.languages || []), language],
    }));
  };

  const updateFormField = (field: keyof Therapist, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as string]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Therapists</h1>
          <p className="text-muted-foreground">Manage therapist profiles and schedules</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={18} />
          Add Therapist
        </button>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-950"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-600 dark:bg-green-950"
          >
            <CheckCircle size={20} />
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search therapists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Therapists Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : therapists.length === 0 ? (
        <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
          <Award className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No therapists found</p>
          <button
            onClick={openAddModal}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Add your first therapist
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {therapists.map((therapist) => (
            <motion.div
              key={therapist._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:shadow-xl"
            >
              {/* Status Badges */}
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                {therapist.isFeatured && (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                    Featured
                  </span>
                )}
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  therapist.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {therapist.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Profile Pic */}
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    {therapist.profilePic ? (
                      <img
                        src={getProfilePicUrl(therapist.profilePic) || ""}
                        alt={therapist.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-semibold text-foreground truncate">
                      {therapist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {therapist.title}
                    </p>
                    {renderStars(therapist.rating)}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award size={16} />
                    <span>{therapist.experience}</span>
                  </div>
                  {therapist.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone size={16} />
                      <span>{therapist.phone}</span>
                    </div>
                  )}
                  {therapist.languages && therapist.languages.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe size={16} />
                      <span>{therapist.languages.join(", ")}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {therapist.specialties?.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {specialty}
                      </span>
                    ))}
                    {therapist.specialties && therapist.specialties.length > 3 && (
                      <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        +{therapist.specialties.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star size={14} />
                    <span>{therapist.reviewCount} reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar size={14} />
                    <span>{therapist.bookingCount} bookings</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(therapist)}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                      title={therapist.isActive ? "Deactivate" : "Activate"}
                    >
                      {therapist.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(therapist)}
                      className={`flex items-center gap-1.5 text-sm hover:text-foreground ${
                        therapist.isFeatured ? "text-amber-500" : "text-muted-foreground"
                      }`}
                      title={therapist.isFeatured ? "Remove from featured" : "Add to featured"}
                    >
                      <Heart size={16} className={therapist.isFeatured ? "fill-current" : ""} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(therapist)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(therapist._id)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-card shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card p-4">
                <h2 className="font-serif text-xl font-semibold">
                  {modalMode === "add" ? "Add New Therapist" : "Edit Therapist"}
                </h2>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {profilePicPreview ? (
                      <div className="relative">
                        <img
                          src={profilePicPreview}
                          alt="Preview"
                          className="h-32 w-32 rounded-xl object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeProfilePic}
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:border-primary hover:bg-muted"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {profilePicPreview ? "Change Photo" : "Upload Photo"}
                  </button>
                  {formErrors.profilePic && (
                    <p className="text-sm text-red-500">{formErrors.profilePic}</p>
                  )}
                </div>

                {/* Basic Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Name *</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => updateFormField("name", e.target.value)}
                      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-1 ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-input focus:border-primary focus:ring-primary"
                      }`}
                      placeholder="Full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Title *</label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => updateFormField("title", e.target.value)}
                      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-1 ${
                        formErrors.title
                          ? "border-red-500 focus:border-red-500"
                          : "border-input focus:border-primary focus:ring-primary"
                      }`}
                      placeholder="e.g., Senior Massage Therapist"
                    />
                    {formErrors.title && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                    )}
                  </div>
                </div>

                {/* Experience & Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Experience *</label>
                    <input
                      type="text"
                      value={formData.experience || ""}
                      onChange={(e) => updateFormField("experience", e.target.value)}
                      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-1 ${
                        formErrors.experience
                          ? "border-red-500 focus:border-red-500"
                          : "border-input focus:border-primary focus:ring-primary"
                      }`}
                      placeholder="e.g., 10 years"
                    />
                    {formErrors.experience && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.experience}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => updateFormField("phone", e.target.value)}
                      className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => updateFormField("email", e.target.value)}
                    className="w-full rounded-lg border border-input px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Email address"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Bio *</label>
                  <textarea
                    value={formData.bio || ""}
                    onChange={(e) => updateFormField("bio", e.target.value)}
                    rows={3}
                    className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-1 resize-none ${
                      formErrors.bio
                        ? "border-red-500 focus:border-red-500"
                        : "border-input focus:border-primary focus:ring-primary"
                    }`}
                    placeholder="Brief bio about the therapist..."
                  />
                  {formErrors.bio && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.bio}</p>
                  )}
                </div>

                {/* Specialties */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Specialties * <span className="text-muted-foreground">(select at least one)</span>
                  </label>
                  {formErrors.specialties && (
                    <p className="mb-2 text-sm text-red-500">{formErrors.specialties}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SPECIALTIES.map((specialty) => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => toggleSpecialty(specialty)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                          formData.specialties?.includes(specialty)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_LANGUAGES.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => toggleLanguage(language)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                          formData.languages?.includes(language)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Rating</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => updateFormField("rating", star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={24}
                            className={`cursor-pointer transition-colors ${
                              star <= (formData.rating || 0)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 hover:text-amber-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {(formData.rating || 0).toFixed(1)} / 5.0
                    </span>
                  </div>
                </div>

                {/* Status Toggles */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive || false}
                      onChange={(e) => updateFormField("isActive", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured || false}
                      onChange={(e) => updateFormField("isFeatured", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Featured</span>
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {submitting && <Loader2 size={18} className="animate-spin" />}
                    {submitting ? "Saving..." : modalMode === "edit" ? "Update" : "Create"} Therapist
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-xl bg-card p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl font-semibold">Delete Therapist</h3>
              <p className="mt-2 text-muted-foreground">
                Are you sure you want to delete this therapist? This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminTherapists;
