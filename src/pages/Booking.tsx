import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle, Clock, Shield, Sparkles, Calendar as CalendarIcon, ArrowRight, User, Phone, Mail, MessageSquare, Star, MapPin, Phone as PhoneIcon } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { services, getPopularServices } from "@/data/services";
import { therapists } from "@/data/therapists";
import spaProcess from "@/assets/spa-process.jpg";

const timeSlots = [
  { time: "09:00", label: "9:00 AM" },
  { time: "10:00", label: "10:00 AM" },
  { time: "11:00", label: "11:00 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "13:00", label: "1:00 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "15:00", label: "3:00 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "17:00", label: "5:00 PM" },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  therapist: string;
  date: string;
  time: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  therapist: "",
  date: "",
  time: "",
  message: "",
};

const perks = [
  { icon: Clock, text: "Free 15-min consultation", color: "text-green-500" },
  { icon: Shield, text: "100% satisfaction guarantee", color: "text-blue-500" },
  { icon: Sparkles, text: "Complimentary herbal tea", color: "text-amber-500" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const Booking = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  const popularServices = getPopularServices();

  const update = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.service) e.service = "Select a service";
    if (!form.date) e.date = "Select a date";
    if (!form.time) e.time = "Select a time slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding min-h-screen flex items-center justify-center">
        <div className="container-spa">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto max-w-lg text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mb-8 inline-flex"
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
              <div className="relative rounded-full bg-primary p-6">
                <CheckCircle size={64} className="text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 rounded-full bg-accent p-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={24} className="text-accent-foreground" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-4xl font-medium text-foreground md:text-5xl"
            >
              Booking <span className="text-primary">Confirmed!</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            >
              Thank you, <span className="font-semibold text-foreground">{form.name}</span>!
              Your <span className="font-semibold text-primary">{form.service}</span> appointment on{" "}
              <span className="font-semibold text-foreground">{form.date}</span> at{" "}
              <span className="font-semibold text-foreground">{form.time}</span> has been received.
              We'll contact you shortly to confirm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="relative z-10">Book Another</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";
  const labelClass = "mb-2 flex items-center gap-2 text-sm font-medium text-foreground";
  const errorClass = "mt-1.5 text-xs text-destructive";

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={spaProcess}
            alt="Treatment room"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90 md:bg-gradient-to-r md:from-background/80 md:via-background/60 md:to-background/80" />
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -25, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl"
          />
        </div>

        {/* Floating Icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              y: [-20, 0, -20],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 1.2,
            }}
            className="absolute text-primary/20"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 70}%`,
              fontSize: `${16 + Math.random() * 16}px`,
            }}
          >
            {["✨", "🌿", "💫", "🕯️", "🌸", "🍃", "🌺", "⭐"][i % 8]}
          </motion.div>
        ))}

        {/* Content */}
        <div className="container-spa relative z-10 py-20">
          <div className="max-w-3xl text-center mx-auto">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2.5 w-2.5 rounded-full bg-primary"
              />
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-primary">
                <CalendarIcon size={14} />
                Easy Online Booking
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 text-sm uppercase tracking-[0.25em] text-muted-foreground"
            >
              Reserve Your Spot
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl font-medium leading-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Book an{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Appointment</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Choose your preferred treatment, therapist, and time. We'll take care of the
              rest to create your perfect wellness experience.
            </motion.p>

            {/* Perks Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {perks.map((perk, index) => (
                <motion.div
                  key={perk.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-2.5 shadow backdrop-blur-sm transition-all hover:shadow-md"
                >
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <perk.icon size={16} className={perk.color} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{perk.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Book Now</span>
            <div className="h-10 w-px bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="section-padding py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
        </div>

        <div className="container-spa">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-12 lg:grid-cols-12"
          >
            {/* Sidebar - Popular Services */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="rounded-2xl bg-card/80 p-6 shadow-lg backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-2">
                    <Sparkles size={20} className="text-primary" />
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      Popular Services
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {popularServices.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => update("service", service.name)}
                        className={`cursor-pointer overflow-hidden rounded-xl border transition-all ${
                          form.service === service.name
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                            : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-4 p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-serif font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{service.price}</p>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="fill-amber-400 text-amber-400" />
                              <span className="text-xs text-muted-foreground">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="mt-8 border-t border-border pt-6">
                    <h4 className="mb-4 font-medium text-foreground">Need Help?</h4>
                    <div className="space-y-3">
                      <a
                        href="tel:+1234567890"
                        className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <PhoneIcon size={18} className="text-primary" />
                        (123) 456-7890
                      </a>
                      <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                        <MapPin size={18} className="text-primary" />
                        123 Serenity Lane, Wellness City
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={itemVariants} className="lg:col-span-8">
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-3xl bg-card/80 shadow-2xl backdrop-blur-sm"
              >
                {/* Decorative background */}
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-100/20 blur-3xl" />

                <div className="relative p-6 md:p-8 lg:p-10">
                  {/* Progress Steps */}
                  <div className="mb-8 flex items-center justify-between">
                    {[
                      { step: 1, label: "Service" },
                      { step: 2, label: "Date & Time" },
                      { step: 3, label: "Details" },
                    ].map((s, i) => (
                      <div key={s.step} className="flex items-center">
                        <div className="flex items-center gap-3">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${
                              activeStep >= s.step
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {activeStep > s.step ? (
                              <CheckCircle size={20} />
                            ) : (
                              s.step
                            )}
                          </motion.div>
                          <span
                            className={`hidden text-sm font-medium md:block ${
                              activeStep >= s.step ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < 2 && (
                          <div
                            className={`h-0.5 w-12 md:w-24 ${
                              activeStep > s.step ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {/* Step 1: Service & Therapist */}
                    <AnimatePresence mode="wait">
                      {activeStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className={labelClass}>
                              <Sparkles size={16} className="text-primary" />
                              Select Service *
                            </label>
                            <select
                              className={inputClass}
                              value={form.service}
                              onChange={(e) => update("service", e.target.value)}
                            >
                              <option value="">Choose a service...</option>
                              {services.map((s) => (
                                <option key={s.id} value={s.name}>
                                  {s.name} - {s.price} ({s.duration})
                                </option>
                              ))}
                            </select>
                            {errors.service && <p className={errorClass}>{errors.service}</p>}
                          </div>

                          <div>
                            <label className={labelClass}>
                              <User size={16} className="text-primary" />
                              Preferred Therapist (Optional)
                            </label>
                            <select
                              className={inputClass}
                              value={form.therapist}
                              onChange={(e) => update("therapist", e.target.value)}
                            >
                              <option value="">Any available therapist</option>
                              {therapists.map((t) => (
                                <option key={t.id} value={t.name}>
                                  {t.name} - {t.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Date & Time */}
                      {activeStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <label className={labelClass}>
                                <CalendarIcon size={16} className="text-primary" />
                                Preferred Date *
                              </label>
                              <input
                                type="date"
                                className={inputClass}
                                value={form.date}
                                onChange={(e) => update("date", e.target.value)}
                              />
                              {errors.date && <p className={errorClass}>{errors.date}</p>}
                            </div>
                          </div>

                          <div>
                            <label className={labelClass}>
                              <Clock size={16} className="text-primary" />
                              Select Time Slot *
                            </label>
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                              {timeSlots.map((slot) => (
                                <motion.button
                                  key={slot.time}
                                  type="button"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => update("time", slot.label)}
                                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                                    form.time === slot.label
                                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                      : "border-border bg-background text-foreground hover:border-primary/50"
                                  }`}
                                >
                                  {slot.label}
                                </motion.button>
                              ))}
                            </div>
                            {errors.time && <p className={errorClass}>{errors.time}</p>}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Personal Details */}
                      {activeStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <label className={labelClass}>
                                <User size={16} className="text-primary" />
                                Full Name *
                              </label>
                              <input
                                className={inputClass}
                                placeholder="Jane Doe"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                              />
                              {errors.name && <p className={errorClass}>{errors.name}</p>}
                            </div>
                            <div>
                              <label className={labelClass}>
                                <Phone size={16} className="text-primary" />
                                Phone Number *
                              </label>
                              <input
                                className={inputClass}
                                placeholder="(555) 000-0000"
                                value={form.phone}
                                onChange={(e) => update("phone", e.target.value)}
                              />
                              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                            </div>
                          </div>

                          <div>
                            <label className={labelClass}>
                              <Mail size={16} className="text-primary" />
                              Email Address *
                            </label>
                            <input
                              type="email"
                              className={inputClass}
                              placeholder="jane@example.com"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                            />
                            {errors.email && <p className={errorClass}>{errors.email}</p>}
                          </div>

                          <div>
                            <label className={labelClass}>
                              <MessageSquare size={16} className="text-primary" />
                              Special Requests (Optional)
                            </label>
                            <textarea
                              className={inputClass + " min-h-[120px] resize-none"}
                              placeholder="Any notes, allergies, or preferences..."
                              value={form.message}
                              onChange={(e) => update("message", e.target.value)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between border-t border-border pt-6">
                      {activeStep > 1 ? (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveStep((p) => p - 1)}
                          className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          Back
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      {activeStep < 3 ? (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (activeStep === 1 && !form.service) {
                              setErrors((p) => ({ ...p, service: "Select a service" }));
                              return;
                            }
                            if (activeStep === 2 && (!form.date || !form.time)) {
                              setErrors((p) => ({
                                ...p,
                                date: form.date || "Select a date",
                                time: form.time || "Select a time",
                              }));
                              return;
                            }
                            setActiveStep((p) => p + 1);
                          }}
                          className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                        >
                          Continue
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                        >
                          <span className="relative z-10">Confirm Booking</span>
                          <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Booking;
