import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import aboutImage from "@/assets/spa-about.jpg";
import spaLounge from "@/assets/spa-lounge.jpg";
import spaOils from "@/assets/spa-oils.jpg";
import spaExterior from "@/assets/spa-exterior.jpg";
import { Award, Users, Clock, Leaf, Heart, Shield, Sparkles, ArrowRight, Star, Quote } from "lucide-react";

const stats = [
  { icon: Award, value: "15+", label: "Years of Excellence", color: "text-amber-500" },
  { icon: Users, value: "50K+", label: "Happy Guests", color: "text-primary" },
  { icon: Clock, value: "100K+", label: "Treatments Given", color: "text-green-500" },
  { icon: Leaf, value: "100%", label: "Organic Products", color: "text-teal-500" },
];

const values = [
  { icon: Heart, title: "Compassion", desc: "We treat every guest with genuine care and empathy, creating a safe space for healing." },
  { icon: Shield, title: "Integrity", desc: "Transparency and honesty guide every interaction, from pricing to treatment recommendations." },
  { icon: Sparkles, title: "Excellence", desc: "We continuously refine our craft, investing in education and the finest products." },
  { icon: Leaf, title: "Sustainability", desc: "We're committed to eco-friendly practices, from organic products to energy-efficient facilities." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

const About = () => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src={aboutImage}
          alt="Tripod Wellness Spa"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90 md:bg-gradient-to-r md:from-background/80 md:via-background/60 md:to-background/80" />
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: -150,
            x: Math.random() * 100 - 50,
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 1,
            ease: "linear",
          }}
          className="absolute"
          style={{ left: `${10 + Math.random() * 80}%` }}
        >
          <Sparkles className={`h-4 w-4 ${i % 2 === 0 ? "text-primary/30" : "text-amber-400/30"}`} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="container-spa relative z-10 py-20">
        <div className="max-w-3xl text-center mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2.5 w-2.5 rounded-full bg-primary"
            />
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              Since 2010
            </span>
          </motion.div>

          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-2 text-sm uppercase tracking-[0.25em] text-muted-foreground"
          >
            Our Story
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-5xl font-medium leading-tight text-foreground md:text-6xl lg:text-7xl"
          >
            About{" "}
            <span className="relative">
              <span className="relative z-10 text-primary">Tripod Wellness</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>{" "}
            Spa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            A sanctuary born from the belief that everyone deserves a space to slow down,
            breathe, and heal.
          </motion.p>

          {/* Decorative Element */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
          />

          {/* Quick Stats in Hero */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            {stats.slice(0, 4).map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <stat.icon size={24} className={stat.color} />
                  <span className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                    {stat.value}
                  </span>
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
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
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>

    {/* Story */}
    <section className="section-padding py-20 md:py-28">
      <div className="container-spa">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <AnimatedSection direction="left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src={aboutImage}
                  alt="Spa treatment setup"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="absolute -bottom-6 -right-6 rounded-2xl bg-primary p-6 text-center shadow-2xl"
              >
                <p className="font-serif text-3xl font-bold text-primary-foreground">Est.</p>
                <p className="font-serif text-3xl font-bold text-primary-foreground">2010</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                  Our Beginning
                </p>
              </motion.div>

              {/* Decorative element */}
              <div className="absolute -left-8 top-1/2 h-24 w-24 rounded-full border-2 border-primary/20" />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                <Sparkles size={12} />
                Our Beginning
              </span>
              <h2 className="mt-2 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
                A Sanctuary{" "}
                <span className="relative">
                  <span className="relative z-10 text-primary">Born</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </span>{" "}
                from Passion
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground md:text-lg">
                Tripod Wellness with a simple belief: everyone deserves a space
                to slow down, breathe, and heal. What started as a small studio has grown
                into a premier wellness destination, yet our commitment to personalized,
                heartfelt care remains unchanged.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground md:text-lg">
                Our team of certified therapists draws from a rich tapestry of healing
                traditions — from ancient Thai techniques to modern therapeutic methods —
                all delivered in an environment designed to soothe every sense.
              </p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/services"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    <span className="relative z-10">Explore Our Services</span>
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
      </div>

      <div className="container-spa">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl bg-card/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl"
            >
              <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-primary/5" />
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative z-10 mb-4 flex justify-center"
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <s.icon size={32} className={s.color} />
                </div>
              </motion.div>
              <p className="font-serif text-4xl font-bold text-foreground">{s.value}</p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
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

    {/* Image Mosaic */}
    <section className="section-padding py-20 md:py-28">
      <div className="container-spa">
        <AnimatedSection className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles size={12} />
            Our Spaces
          </span>
          <h2 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Discover Our{" "}
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
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { src: spaLounge, alt: "Spa lounge", span: "md:col-span-2 md:row-span-2", height: "h-64 md:h-full" },
            { src: spaOils, alt: "Essential oils", span: "", height: "h-32 md:h-40" },
            { src: spaExterior, alt: "Spa exterior", span: "", height: "h-32 md:h-40" },
            { src: aboutImage, alt: "Treatment room", span: "col-span-2", height: "h-48 md:h-56" },
          ].map((img, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl shadow-lg ${img.span} ${img.height}`}
            >
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-spa">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Heart size={12} />
            What Drives Us
          </span>
          <h2 className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Our Core{" "}
            <span className="relative">
              <span className="relative z-10 text-primary">Values</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </h2>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-card/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div
                variants={{
                  hover: { rotate: 180, scale: 1.1 },
                }}
                whileHover="hover"
                className="relative mb-6 flex justify-center"
              >
                <div className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <div className="p-4">
                    <v.icon size={28} />
                  </div>
                </div>
              </motion.div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
              <motion.div
                className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Philosophy */}
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-spa mx-auto max-w-4xl text-center">
        <AnimatedSection>
          {/* Quote icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8 flex justify-center"
          >
            <div className="rounded-full bg-primary/10 p-6">
              <Quote size={48} className="text-primary" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-3xl font-medium leading-relaxed text-foreground md:text-4xl"
          >
            We believe wellness is not a luxury — it's a necessity. Every treatment at
            Tripod Wellness Spa is a mindful ritual designed to restore harmony between body,
            mind, and spirit. We honor the ancient wisdom of healing while embracing
            modern science to deliver results you can feel.
          </motion.h2>

          {/* Decorative stars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center gap-2"
          >
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Star size={20} className="fill-amber-400 text-amber-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                to="/booking"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-10 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30"
              >
                <span className="relative z-10">Start Your Journey</span>
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  </>
);

export default About;
