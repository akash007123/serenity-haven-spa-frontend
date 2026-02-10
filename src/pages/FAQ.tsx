import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronDown, Search, MessageCircle, HelpCircle, Sparkles, Mail, Phone, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { faqItems } from "@/data/faq";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  const categories = ["All", "Booking", "Services", "Policies", "General"];

  const filtered = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory === "All" ? faqItems : faqItems;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10" />
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -25, 0], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute right-1/3 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
          />
        </div>

        {/* Floating Question Marks */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              rotate: Math.random() * 20 - 10,
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 1,
            }}
            className="absolute text-primary/20"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 70}%`,
              fontSize: `${20 + Math.random() * 20}px`,
            }}
          >
            {["?", "❓", "⁇", "？"][i % 4]}
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
                <HelpCircle size={14} />
                We're Here to Help
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 text-sm uppercase tracking-[0.25em] text-muted-foreground"
            >
              Have Questions?
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl font-medium leading-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Frequently{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Asked</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>{" "}
              Questions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Find answers to the most common questions about our services, policies, and
              treatments.
            </motion.p>

            {/* Search Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mx-auto mt-10 max-w-lg"
            >
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-card py-4 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-lg transition-all"
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap justify-center gap-8"
            >
              {[
                { value: faqItems.length, label: "Questions", icon: HelpCircle },
                { value: "24hr", label: "Response", icon: Clock },
                { value: "100%", label: "Satisfaction", icon: CheckCircle },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 rounded-full border border-border bg-card/80 px-6 py-3 shadow backdrop-blur-sm"
                >
                  <stat.icon size={20} className="text-primary" />
                  <div className="text-left">
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
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
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Browse</span>
            <div className="h-10 w-px bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-md py-4">
        <div className="container-spa">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card text-muted-foreground hover:text-foreground hover:shadow-md"
                }`}
              >
                <span className="relative z-10">{cat}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="section-padding py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
        </div>

        <div className="container-spa mx-auto max-w-4xl">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Search size={32} className="text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">
                No results found
              </h3>
              <p className="text-muted-foreground">
                We couldn't find any matches for "{searchQuery}". Try different keywords or
                browse all categories.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSearchQuery("")}
                className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl"
              >
                Clear Search
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={selectedCategory + searchQuery}
              className="grid gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.question + i}
                    variants={itemVariants}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group overflow-hidden rounded-2xl bg-card/80 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
                  >
                    <motion.button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <div className="pr-4">
                        {item.question}
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="border-t border-border px-6 pb-6 pt-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="flex gap-4"
                            >
                              <div className="shrink-0">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                                  <Sparkles size={14} className="text-primary" />
                                </div>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-1/2 bg-gradient-to-l from-accent/5 to-transparent" />
        </div>

        <div className="container-spa mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-card/80 p-10 text-center shadow-2xl backdrop-blur-sm md:p-14"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-100/20 blur-3xl" />

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/25"
            >
              <MessageCircle size={40} />
            </motion.div>

            <h2 className="relative font-serif text-3xl font-medium text-foreground md:text-4xl">
              Still Have{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Questions</span>
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

            <p className="relative mt-4 text-muted-foreground">
              Can't find what you're looking for? Our team is happy to help with any
              questions you may have.
            </p>

            {/* Contact options */}
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="mailto:hello@serenityspa.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground shadow backdrop-blur-sm transition-all hover:shadow-md"
              >
                <Mail size={18} className="text-primary" />
                Email Us
              </motion.a>
              <motion.a
                href="tel:+15551234567"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground shadow backdrop-blur-sm transition-all hover:shadow-md"
              >
                <Phone size={18} className="text-primary" />
                Call Us
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative mt-10"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Support
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
