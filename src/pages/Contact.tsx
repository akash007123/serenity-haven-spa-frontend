import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, Instagram, Facebook, Sparkles, MessageCircle, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import spaExterior from "@/assets/spa-exterior.jpg";
import spaLounge from "@/assets/spa-lounge.jpg";
import api from "@/lib/api";

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Tranquil Lane",
    subValue: "Wellness City, WC 10001",
    color: "text-red-500",
    bg: "bg-red-100",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "(555) 123-4567",
    subValue: "Mon-Sat: 9AM - 8PM",
    color: "text-green-500",
    bg: "bg-green-100",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@serenityspa.com",
    subValue: "We reply within 24 hours",
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Sat: 9AM - 8PM",
    subValue: "Sunday: 10AM - 6PM",
    color: "text-amber-500",
    bg: "bg-amber-100",
  },
];

const faqItems = [
  {
    question: "Do I need to book in advance?",
    answer: "While walk-ins are welcome based on availability, we recommend booking in advance to secure your preferred time and therapist.",
  },
  {
    question: "What should I wear?",
    answer: "Comfortable loose-fitting clothing is recommended. We'll provide appropriate draping during your treatment.",
  },
  {
    question: "How early should I arrive?",
    answer: "We suggest arriving 15 minutes before your appointment to complete any necessary paperwork and enjoy our relaxation lounge.",
  },
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

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      await api.createContact({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";
  const labelClass = "mb-2 flex items-center gap-2 text-sm font-medium text-foreground";

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
            src={spaExterior}
            alt="Serenity Spa exterior"
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
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              rotate: Math.random() * 30 - 15,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1,
            }}
            className="absolute text-primary/20"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 70}%`,
              fontSize: `${16 + Math.random() * 16}px`,
            }}
          >
            {["✨", "🌿", "💫", "🕯️", "🌸", "🍃", "🌺", "⭐", "🌙", "💐"][i % 10]}
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
                <MessageCircle size={14} />
                We'd Love to Hear
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 text-sm uppercase tracking-[0.25em] text-muted-foreground"
            >
              Get in Touch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl font-medium leading-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Contact{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Us</span>
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
              Reach out for bookings, questions, or simply to say hello. We're here to
              help you on your wellness journey.
            </motion.p>

            {/* Quick Contact Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <a
                href="tel:+15551234567"
                className="group flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground shadow backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary">
                  <Phone size={18} className="text-primary" />
                </div>
                <span>(555) 123-4567</span>
              </a>
              <a
                href="mailto:hello@serenityspa.com"
                className="group flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground shadow backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary">
                  <Mail size={18} className="text-primary" />
                </div>
                <span>hello@serenityspa.com</span>
              </a>
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
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Contact</span>
            <div className="h-10 w-px bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
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
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                >
                  <item.icon size={28} />
                </motion.div>

                <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                  {item.label}
                </h3>
                <p className="font-medium text-foreground">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.subValue}</p>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-primary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-spa">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info + Map */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                  <Sparkles size={12} />
                  Find Us
                </span>
                <h2 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
                  Visit Our{" "}
                  <span className="relative">
                    <span className="relative z-10 text-primary">Sanctuary</span>
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </span>
                </h2>
              </motion.div>

              {/* Map */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <iframe
                  title="Tripod Spa Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </motion.div>

              {/* Spa exterior image */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl shadow-xl"
              >
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src={spaLounge}
                  alt="Spa lounge"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-serif text-xl font-bold text-white">Our Relaxation Lounge</p>
                  <p className="text-white/80">Begin your journey before your treatment</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Facebook, label: "Facebook" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-medium text-foreground shadow backdrop-blur-sm transition-all hover:shadow-md"
                  >
                    <social.icon size={18} className="text-primary" />
                    {social.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Decorative background */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-xl" />

              {submitted ? (
                <motion.div
                  variants={itemVariants}
                  className="flex h-full flex-col items-center justify-center rounded-3xl bg-card/80 p-10 text-center shadow-2xl backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative mb-6"
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                    <div className="relative rounded-full bg-primary p-6">
                      <CheckCircle size={64} className="text-primary-foreground" />
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 rounded-full bg-accent p-3"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={24} className="text-accent-foreground" />
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-3xl font-medium text-foreground"
                  >
                    Message <span className="text-primary">Sent!</span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-muted-foreground"
                  >
                    Thank you for reaching out! We'll get back to you within 24 hours.
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className="relative overflow-hidden rounded-3xl bg-card/80 p-8 shadow-2xl backdrop-blur-sm md:p-10"
                >
                  <div className="mb-8">
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                      <MessageCircle size={12} />
                      Send a Message
                    </span>
                    <h3 className="mt-2 font-serif text-3xl font-medium text-foreground md:text-4xl">
                      Get in{" "}
                      <span className="relative">
                        <span className="relative z-10 text-primary">Touch</span>
                        <motion.span
                          className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        />
                      </span>
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className={labelClass}>
                          <span className="text-primary">●</span> Your Name *
                        </label>
                        <input
                          className={inputClass}
                          placeholder="Jane Doe"
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          <span className="text-primary">●</span> Your Email *
                        </label>
                        <input
                          type="email"
                          className={inputClass}
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Subject</label>
                      <input
                        className={inputClass}
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        <span className="text-primary">●</span> Your Message *
                      </label>
                      <textarea
                        className={inputClass + " min-h-[150px] resize-none"}
                        placeholder="Tell us more about your inquiry..."
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="group mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="relative z-10 flex items-center gap-2">
                          Send Message
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </>
                    )}
                  </motion.button>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center text-sm text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding py-20 md:py-28">
        <div className="container-spa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              <Sparkles size={12} />
              FAQ
            </span>
            <h2 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              Common{" "}
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
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqItems.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-foreground">
                    {faq.question}
                    <motion.span
                      className="rounded-full bg-primary/10 p-2 text-primary transition-transform group-open:rotate-180"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </summary>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="px-6 pb-6 text-muted-foreground"
                  >
                    {faq.answer}
                  </motion.div>
                </details>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="mb-4 text-muted-foreground">Ready to book your appointment?</p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                to="/booking"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30"
              >
                <Calendar size={18} />
                <span className="relative z-10">Book Now</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
