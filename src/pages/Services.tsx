import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { Clock, X, CheckCircle, ArrowRight, Sparkles, Star, Calendar, Heart, Award, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import api from "@/lib/api";
import serviceSwedish from "@/assets/service-swedish.jpg";
import serviceAromatherapy from "@/assets/service-aromatherapy.jpg";
import serviceHotStone from "@/assets/service-hot-stone.jpg";
import serviceThai from "@/assets/service-thai.jpg";
import spaProcess from "@/assets/spa-process.jpg";

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
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
}

const serviceImages: Record<string, string> = {
  swedish: serviceSwedish,
  "deep-tissue": serviceSwedish,
  aromatherapy: serviceAromatherapy,
  "hot-stone": serviceHotStone,
  thai: serviceThai,
  reflexology: serviceThai,
  sports: serviceSwedish,
  prenatal: serviceAromatherapy,
};

const heroServices = [
  { name: "Swedish", icon: "🕊️", color: "text-green-600" },
  { name: "Deep Tissue", icon: "💪", color: "text-amber-700" },
  { name: "Aromatherapy", icon: "🌸", color: "text-pink-600" },
  { name: "Hot Stone", icon: "🪨", color: "text-orange-700" },
  { name: "Thai", icon: "🧘", color: "text-yellow-700" },
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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<{ minutes: number; price: string } | null>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const [servicesRes, categoriesRes] = await Promise.all([
        api.getServices({ active: true }),
        api.getServiceCategories(),
      ]);
      
      if (servicesRes.success && servicesRes.data) {
        console.log("Public services fetched:", servicesRes.data.map(s => ({ id: s._id, name: s.name, category: s.category, isActive: s.isActive })));
        setServices(servicesRes.data);
      }
      if (categoriesRes.success && categoriesRes.data) {
        console.log("Categories fetched:", categoriesRes.data);
        setCategories([
          { id: "all", name: "All Services", icon: "sparkles" },
          ...categoriesRes.data.map((c: any) => ({
            id: (c.name || c.id || "").toString(),
            name: c.name || c.id,
            icon: c.icon || "sparkles",
          })),
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter((s) => {
        const serviceCategory = (s.category || "").trim().toLowerCase();
        const selectedCat = selectedCategory.trim().toLowerCase();
        const matches = serviceCategory === selectedCat;
        if (!matches) {
          console.log(`Service "${s.name}" filtered out: serviceCategory="${serviceCategory}" !== selectedCat="${selectedCat}"`);
        }
        return matches;
      });

  console.log("Current state:", {
    servicesCount: services.length,
    filteredServicesCount: filteredServices.length,
    selectedCategory,
    categoriesCount: categories.length
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setSelectedDuration(service.durations[0] || null);
  };

  // Use API data or fallback to static hero services
  const heroServices = categories.length > 1 
    ? categories.filter((c) => c.id !== "all").slice(0, 5).map((c) => ({
        name: c.name,
        icon: "✨",
        color: "text-primary"
      }))
    : [
        { name: "Swedish", icon: "🕊️", color: "text-green-600" },
        { name: "Deep Tissue", icon: "💪", color: "text-amber-700" },
        { name: "Aromatherapy", icon: "🌸", color: "text-pink-600" },
        { name: "Hot Stone", icon: "🪨", color: "text-orange-700" },
        { name: "Thai", icon: "🧘", color: "text-yellow-700" },
      ];

  // Debug category mapping
  console.log("Category mapping debug:", {
    selectedCategory,
    servicesCategories: [...new Set(services.map(s => s.category))],
    categoriesIds: categories.map(c => c.id),
    categoriesNames: categories.map(c => c.name)
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={serviceThai}
            alt="Spa services"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90 md:bg-gradient-to-r md:from-background/80 md:via-background/60 md:to-background/80" />
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-10 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -35, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute right-1/3 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
          />
        </div>

        {/* Floating Icons */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1,
            }}
            className="absolute text-2xl"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 70}%`
            }}
          >
            {["✨", "🌿", "💫", "🕯️", "🌸", "🍃", "✨", "🌺", "🌙", "⭐"][i % 10]}
          </motion.div>
        ))}

        {/* Content */}
        <div className="container-spa relative z-10 py-20">
          <div className="max-w-4xl text-center mx-auto">
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
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                Premium Treatments
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 text-sm uppercase tracking-[0.25em] text-muted-foreground"
            >
              Our Menu
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl font-medium leading-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Services{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">& Pricing</span>
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
              Each treatment is a carefully choreographed journey, tailored to your body's
              needs and your desire for renewal.
            </motion.p>

            {/* Service Icons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {heroServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
                >
                  <span className="text-xl">{service.icon}</span>
                  <span className="text-xs font-medium uppercase tracking-wide text-foreground">
                    {service.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link
                  to="/booking"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30"
                >
                  <Calendar size={18} className="relative z-10" />
                  <span className="relative z-10">Book Your Session</span>
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative z-10"
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>
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
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Explore</span>
            <div className="h-10 w-px bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="section-padding py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
        </div>

        <div className="container-spa">
          {/* Category Filter */}
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category, i) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Services Grid */}
          {!loading && filteredServices.length === 0 && (
            <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
              <p className="mt-2 text-muted-foreground">No services found</p>
            </div>
          )}
          {!loading && filteredServices.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={selectedCategory}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredServices.map((s) => (
                <motion.div
                  key={s._id}
                  variants={itemVariants}
                  onClick={() => handleServiceClick(s)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-card/80 shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl"
                  whileHover={{ y: -8 }}
                >
                  <>
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={serviceImages[s.image] || serviceSwedish}
                        alt={s.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        {(s.category || "General")}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1">{s.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.shortDescription}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock size={16} />
                          <span>{(s.durations?.map(d => d.minutes).join("/") || 60)} min</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{s.price}</p>
                        </div>
                      </div>
                    </div>
                  </>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </section>

      {/* Inline CTA with image */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-1/2 bg-gradient-to-l from-amber-100/20 to-transparent" />
        </div>

        <div className="container-spa">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src={spaProcess}
                  alt="Spa treatment"
                  className="relative z-10 rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-3xl bg-primary/20" />
              </motion.div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                <Sparkles size={12} />
                Need Guidance?
              </span>
              <h2 className="mt-2 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
                Not Sure Which{" "}
                <span className="relative">
                  <span className="relative z-10 text-primary">Treatment</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </span>
                ?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Our therapists will help you choose the perfect treatment during your
                complimentary consultation. Every session is customized to your unique needs.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Heart, text: "Personalized consultation included" },
                  { icon: Sparkles, text: "Custom oil blending available" },
                  { icon: Award, text: "Combination packages offered" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-10"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/booking"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Calendar size={18} className="relative z-10" />
                    <span className="relative z-10">Book a Consultation</span>
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="relative z-10"
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl bg-background shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={serviceImages[selectedService.image] || serviceSwedish}
                  alt={selectedService.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute right-4 top-4 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
                  aria-label="Close"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {selectedService.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      {selectedService.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{selectedService.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({selectedService.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {selectedService.description}
                </p>

                {/* Duration Selection */}
                {selectedService.durations.length > 1 && (
                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium text-foreground">Select Duration:</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedService.durations.map((d) => (
                        <motion.button
                          key={d.minutes}
                          onClick={() => setSelectedDuration(d)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                            selectedDuration?.minutes === d.minutes
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                              : "bg-secondary/50 text-foreground hover:bg-secondary"
                          }`}
                        >
                          <Clock size={16} />
                          {d.minutes} min
                          <span className="text-xs opacity-70">- {d.price}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="mb-3 font-serif text-lg font-semibold text-foreground">Benefits</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedService.benefits.map((b) => (
                      <motion.div
                        key={b}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle size={16} className="shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* What to Expect */}
                <div className="mb-6">
                  <h4 className="mb-3 font-serif text-lg font-semibold text-foreground">What to Expect</h4>
                  <ul className="space-y-2">
                    {selectedService.whatToExpect?.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/booking"
                    onClick={() => setSelectedService(null)}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Calendar size={18} />
                    Book This Treatment
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Services;
