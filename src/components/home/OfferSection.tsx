import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Heart, Award, Tag } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import spaExterior from "@/assets/spa-exterior.jpg";

const OfferSection = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <motion.img
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={spaExterior}
        alt=""
        className="h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95 md:bg-gradient-to-r md:from-background/90 md:via-background/70 md:to-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
    </div>

    <div className="container-spa relative z-10">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <AnimatedSection direction="left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent"
            >
              <Sparkles size={12} />
              Limited Time Offer
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl"
            >
              First Visit{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Special</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </span>
            </motion.h2>

            {/* Discount */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="my-6 flex items-baseline gap-2"
            >
              <span className="text-6xl font-bold text-primary md:text-7xl">20%</span>
              <span className="text-xl font-medium text-muted-foreground">Off</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-lg leading-relaxed text-muted-foreground"
            >
              Book your first treatment and enjoy 20% off any service. New guests only.
              Experience the Tripod Wellness difference today.
            </motion.p>

            {/* Features grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-8 grid grid-cols-3 gap-4"
            >
              {[
                { icon: Clock, value: "60+", label: "Min Session" },
                { icon: Heart, value: "5", label: "Treatments" },
                { icon: Award, value: "4", label: "Therapists" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-xl bg-card/80 p-4 text-center shadow-lg backdrop-blur-sm"
                >
                  <feature.icon size={24} className="mx-auto mb-2 text-primary" />
                  <p className="font-serif text-2xl font-bold text-foreground">
                    {feature.value}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {feature.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/booking"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-10 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30"
                >
                  <Tag size={20} className="relative z-10" />
                  <span className="relative z-10">Claim Your Offer</span>
                  <motion.span
                    className="relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </motion.div>

              {/* Trust indicator */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-muted-foreground shadow backdrop-blur-sm"
              >
                <Award size={16} className="text-primary" />
                Best Value Guaranteed
              </motion.span>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        {/* Decorative visual */}
        <AnimatedSection direction="right" className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Floating cards effect */}
            <motion.div
              className="relative z-10 overflow-hidden rounded-3xl shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={spaExterior}
                alt="Tripod Wellness Spa Exterior"
                className="h-[500px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-serif text-2xl font-bold text-white">
                  Tripod Wellness
                </p>
                <p className="text-white/80">Your journey to relaxation starts here</p>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 -right-6 rounded-2xl bg-primary p-6 text-center shadow-2xl"
            >
              <p className="font-serif text-4xl font-bold text-primary-foreground">
                5-Star
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
                Rated
              </p>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -left-8 top-1/2 h-24 w-24 rounded-full border-2 border-primary/20" />
            <motion.div
              className="absolute -right-4 top-1/2 h-16 w-16 rounded-full bg-amber-400/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default OfferSection;
