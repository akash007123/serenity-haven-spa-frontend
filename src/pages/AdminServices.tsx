import { useState, useEffect, useCallback } from "react";
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
  Sparkles,
  Clock,
  DollarSign,
  Tag,
  ImageIcon,
  BookOpen,
  ListChecks,
} from "lucide-react";
import api from "@/lib/api";

interface ServiceDuration {
  minutes: number;
  price: string;
}

interface Service {
  _id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  durations: ServiceDuration[];
  price: string;
  priceRange: {
    min: number;
    max: number;
  };
  image: string;
  category: string;
  featured: boolean;
  popular: boolean;
  benefits: string[];
  benefitDetails: Array<{ label: string; icon?: string }>;
  whatToExpect: string[];
  contraindications?: string[];
  preparationTips?: string[];
  rating?: number;
  reviewCount?: number;
  color?: string;
  gradient?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  "Classic",
  "Therapeutic",
  "Wellness",
  "Traditional",
  "Targeted",
  "Specialty",
];

const INITIAL_FORM_STATE: Partial<Service> = {
  name: "",
  shortDescription: "",
  description: "",
  durations: [{ minutes: 60, price: "" }],
  price: "",
  priceRange: { min: 0, max: 0 },
  image: "swedish",
  category: "Classic",
  featured: false,
  popular: false,
  benefits: [],
  benefitDetails: [],
  whatToExpect: [],
  contraindications: [],
  preparationTips: [],
  rating: 0,
  reviewCount: 0,
  color: "#7c9885",
  gradient: "from-green-100 to-emerald-50",
};

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all services including inactive ones for admin panel
      const response = await api.getServices({
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        search: searchTerm || undefined,
        active: undefined, // Don't filter by active status in admin
      });
      if (response.success && response.data) {
        setServices(response.data);
        console.log("Fetched services:", response.data.map(s => ({ id: s._id, name: s.name, category: s.category, isActive: s.isActive })));
      } else {
        setError(response.message || "Failed to fetch services");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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
    setSelectedService(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setFormData({
      ...service,
      durations: service.durations.length > 0 ? service.durations : [{ minutes: 60, price: "" }],
    });
    setModalMode("edit");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name?.trim()) errors.name = "Service name is required";
    if (!formData.shortDescription?.trim()) errors.shortDescription = "Short description is required";
    if (!formData.description?.trim()) errors.description = "Description is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.durations || formData.durations.length === 0 || !formData.durations[0].price) {
      errors.price = "At least one duration with price is required";
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

      // Calculate price range from durations
      const prices = formData.durations?.map((d) => {
        const num = parseInt(d.price.replace(/[^0-9]/g, ""));
        return isNaN(num) ? 0 : num;
      }) || [0];

      const dataToSubmit = {
        ...formData,
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices),
        },
        price: `From ₹${Math.min(...prices).toLocaleString()}`,
      };

      let response;
      if (modalMode === "edit" && selectedService) {
        response = await api.updateService(selectedService._id, dataToSubmit);
      } else {
        response = await api.createService(dataToSubmit);
      }

      if (response.success) {
        setSuccess(`Service ${modalMode === "edit" ? "updated" : "created"} successfully`);
        closeModal();
        fetchServices();
      } else {
        setError(response.message || `Failed to ${modalMode === "edit" ? "update" : "create"} service`);
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
      const response = await api.deleteService(id);
      if (response.success) {
        setSuccess("Service deleted successfully");
        fetchServices();
      } else {
        setError(response.message || "Failed to delete service");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDeleteConfirm(null);
      setLoading(false);
    }
  };

  const handleToggleStatus = async (service: Service) => {
    try {
      const response = await api.toggleServiceStatus(service._id);
      if (response.success) {
        setSuccess(`Service ${service.isActive ? "deactivated" : "activated"} successfully`);
        fetchServices();
      } else {
        setError(response.message || "Failed to update service status");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const updateFormField = (field: keyof Service, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as string]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addDuration = () => {
    setFormData((prev) => ({
      ...prev,
      durations: [...(prev.durations || []), { minutes: 60, price: "" }],
    }));
  };

  const removeDuration = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      durations: prev.durations?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateDuration = (index: number, field: "minutes" | "price", value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      durations: prev.durations?.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      ) || [],
    }));
  };

  const addArrayItem = (field: "benefits" | "whatToExpect" | "contraindications" | "preparationTips", value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()],
      }));
    }
  };

  const removeArrayItem = (field: "benefits" | "whatToExpect" | "contraindications" | "preparationTips", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || [],
    }));
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
          <h1 className="font-serif text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage spa services and pricing</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={18} />
          Add Service
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

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No services found</p>
          <button
            onClick={openAddModal}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Add your first service
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:shadow-xl"
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                {service.featured && (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                    Featured
                  </span>
                )}
                {service.popular && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Popular
                  </span>
                )}
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  service.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {service.category}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Duration & Price */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock size={16} />
                    <span>{service.durations?.map((d) => d.minutes).join("/") || 60} min</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{service.price}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <button
                    onClick={() => handleToggleStatus(service)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {service.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    {service.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(service._id)}
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
              <h3 className="font-serif text-xl font-semibold">Delete Service</h3>
              <p className="mt-2 text-muted-foreground">
                Are you sure you want to delete this service? This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <h2 className="font-serif text-xl font-semibold">
                {modalMode === "add" ? "Add New Service" : "Edit Service"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium">
                  <BookOpen size={18} />
                  Basic Information
                </h3>

                <div>
                  <label className="mb-1 block text-sm font-medium">Service Name *</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => updateFormField("name", e.target.value)}
                    className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 ${
                      formErrors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-input focus:border-primary focus:ring-primary"
                    }`}
                    placeholder="e.g., Swedish Massage"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Short Description *</label>
                  <textarea
                    value={formData.shortDescription || ""}
                    onChange={(e) => updateFormField("shortDescription", e.target.value)}
                    className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 ${
                      formErrors.shortDescription
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-input focus:border-primary focus:ring-primary"
                    }`}
                    placeholder="Brief description for cards"
                    rows={2}
                  />
                  {formErrors.shortDescription && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.shortDescription}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Full Description *</label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => updateFormField("description", e.target.value)}
                    className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 ${
                      formErrors.description
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-input focus:border-primary focus:ring-primary"
                    }`}
                    placeholder="Detailed description"
                    rows={4}
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Category *</label>
                    <select
                      value={formData.category || "Classic"}
                      onChange={(e) => updateFormField("category", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">Image Key</label>
                    <select
                      value={formData.image || "swedish"}
                      onChange={(e) => updateFormField("image", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="swedish">Swedish</option>
                      <option value="deep-tissue">Deep Tissue</option>
                      <option value="aromatherapy">Aromatherapy</option>
                      <option value="hot-stone">Hot Stone</option>
                      <option value="thai">Thai</option>
                      <option value="reflexology">Reflexology</option>
                      <option value="sports">Sports</option>
                      <option value="prenatal">Prenatal</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => updateFormField("featured", e.target.checked)}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.popular || false}
                      onChange={(e) => updateFormField("popular", e.target.checked)}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Popular</span>
                  </label>
                </div>
              </div>

              {/* Durations & Pricing */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium">
                  <DollarSign size={18} />
                  Durations & Pricing
                </h3>

                {formData.durations?.map((duration, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-muted-foreground">
                        Duration (min)
                      </label>
                      <input
                        type="number"
                        value={duration.minutes}
                        onChange={(e) => updateDuration(index, "minutes", parseInt(e.target.value) || 0)}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-muted-foreground">
                        Price (e.g., 7900)
                      </label>
                      <input
                        type="text"
                        value={duration.price}
                        onChange={(e) => updateDuration(index, "price", e.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="7900"
                      />
                    </div>
                    {formData.durations && formData.durations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDuration(index)}
                        className="mt-5 rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}

                {formErrors.price && (
                  <p className="text-xs text-red-500">{formErrors.price}</p>
                )}

                <button
                  type="button"
                  onClick={addDuration}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Plus size={16} />
                  Add Duration
                </button>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium">
                  <ListChecks size={18} />
                  Benefits
                </h3>

                <div className="flex flex-wrap gap-2">
                  {formData.benefits?.map((benefit, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => removeArrayItem("benefits", index)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add benefit and press Enter"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.currentTarget;
                      addArrayItem("benefits", input.value);
                      input.value = "";
                    }
                  }}
                />
              </div>

              {/* What to Expect */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium">
                  <Sparkles size={18} />
                  What to Expect
                </h3>

                <div className="space-y-2">
                  {formData.whatToExpect?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm">
                        {item}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem("whatToExpect", index)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add expectation and press Enter"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.currentTarget;
                      addArrayItem("whatToExpect", input.value);
                      input.value = "";
                    }
                  }}
                />
              </div>

              {/* Preparation Tips */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium">
                  <Tag size={18} />
                  Preparation Tips
                </h3>

                <div className="space-y-2">
                  {formData.preparationTips?.map((tip, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm">
                        {tip}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem("preparationTips", index)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add preparation tip and press Enter"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.currentTarget;
                      addArrayItem("preparationTips", input.value);
                      input.value = "";
                    }
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {submitting
                    ? modalMode === "edit"
                      ? "Updating..."
                      : "Creating..."
                    : modalMode === "edit"
                    ? "Update Service"
                    : "Create Service"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
};

export default AdminServices;
