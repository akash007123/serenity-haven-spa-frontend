import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Zap, Activity, Dumbbell, Heart, Award, Users, ChevronRight } from "lucide-react";

// Place in production, replaceholder image URLs - with actual images
const gymMassageHero = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80";
const athleteMassage = "https://raob.org/wp-content/uploads/2024/10/sports-massage09.jpg";
const recoveryMassage = "https://powerbuildphysiotherapy.com.au/wp-content/uploads/2023/09/JB_039-1024x684.jpg";
const deepTissue = "https://spaworldhouston.com/wp-content/uploads/2023/09/massage-therapist-performing-deep-tissue-massage-on-a-man-lying-down-facing-down.jpg";

const benefits = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Enhanced Performance",
    description: "Pre-workout massage prepares muscles for optimal performance, increasing flexibility and range of motion.",
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: "Faster Recovery",
    description: "Post-workout massage reduces muscle soreness and accelerates recovery time between training sessions.",
  },
  {
    icon: <Dumbbell className="h-8 w-8" />,
    title: "Muscle Relief",
    description: "Targeted techniques release muscle tension, knots, and adhesions that form from intense training.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Improved Circulation",
    description: "Better blood flow delivers oxygen and nutrients to muscles while removing metabolic waste products.",
  },
];

const services = [
  {
    image: deepTissue,
    title: "Deep Tissue Massage",
    description: "Intensive massage targeting deep muscle layers and connective tissues. Perfect for breaking down stubborn knots and relieving chronic muscle tension from heavy lifting.",
    duration: "60-90 min",
    price: "$80-$120",
    benefits: ["Chronic pain relief", "Injury recovery", "Postural correction"],
  },
  {
    image: athleteMassage,
    title: "Sports Massage",
    description: "Specialized massage combining stretching, compression, and trigger point therapy. Designed to enhance athletic performance and prevent injuries.",
    duration: "45-60 min",
    price: "$70-$100",
    benefits: ["Performance boost", "Injury prevention", "Flexibility increase"],
  },
  {
    image: recoveryMassage,
    title: "Recovery & Rehabilitation",
    description: "Gentle yet effective massage focused on reducing inflammation and promoting healing. Ideal for post-competition or injury recovery periods.",
    duration: "30-60 min",
    price: "$50-$90",
    benefits: ["Reduced soreness", "Faster healing", "Stress relief"],
  },
  {
    image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80",
    title: "Trigger Point Therapy",
    description: "Precision technique targeting specific muscle knots that cause referred pain. Releases tension and restores normal muscle function.",
    duration: "30-45 min",
    price: "$50-$75",
    benefits: ["Pain elimination", "Range of motion", "Muscle activation"],
  },
];

const features = [
  {
    icon: <Award className="h-10 w-10" />,
    title: "Certified Sports Therapists",
    description: "Our team includes certified sports massage therapists with experience working with professional athletes and fitness enthusiasts.",
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Flexible Scheduling",
    description: "Early morning, late evening, and weekend appointments available to fit your training schedule.",
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Personalized Approach",
    description: "Every massage is tailored to your specific sport, training goals, and muscle groups requiring attention.",
  },
];

const testimonials = [
  {
  quote: "As a state-level powerlifter, muscle recovery is everything for me. The sports massage at Tripod Wellness has completely transformed my training routine. I'm lifting heavier with much less soreness and faster recovery.",
  author: "Rahul Verma",
  role: "Competitive Powerlifter",
  rating: 5,
},
{
  quote: "The therapists truly understand the needs of athletes. After my marathon practice sessions, they know exactly which muscle groups require attention. This has been the best recovery decision I’ve made.",
  author: "Amit Sharma",
  role: "Marathon Runner",
  rating: 5,
},
{
  quote: "From CrossFit training to heavy weightlifting sessions, their deep tissue therapy keeps my body performing at its peak. My recovery time has improved significantly, and I feel stronger every week.",
  author: "Vikram Singh",
  role: "CrossFit Athlete",
  rating: 4,
},
{
  quote: "As a professional cricketer, body maintenance is non-negotiable. The sports massage sessions at Tripod Wellness have significantly improved my flexibility and reduced post-match stiffness. I feel match-ready much faster now.",
  author: "Karan Malhotra",
  role: "Professional Cricketer",
  rating: 5,
},
{
  quote: "Intense gym sessions used to leave me with constant muscle tightness. After starting regular deep tissue therapy here, my recovery has become smoother and my performance has improved noticeably.",
  author: "Sandeep Yadav",
  role: "Fitness Trainer",
  rating: 4,
},
{
  quote: "Being a football player, lower body recovery is critical. The therapists focus precisely on the pressure points and muscle groups that need attention. The relief and strength I feel after every session is outstanding.",
  author: "Arjun Rathore",
  role: "Football Player",
  rating: 5,
},

];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GymMassage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${gymMassageHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-spa text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-6 border border-primary/30">
              Specialized Recovery for Athletes
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Gym Massage
              <span className="text-primary">.</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl font-normal">Recovery That Powers Performance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Expert sports massage therapy designed for gym enthusiasts, athletes, and fitness professionals. 
              Recover faster, train harder, and achieve your peak performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition-all hover:shadow-2xl hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Your Session
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-[hsl(152_25%_45%)] transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
              <Link
                to="/services"
                className="group relative overflow-hidden rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span className="flex items-center justify-center gap-2">
                  View All Services
                  <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="container-spa">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary font-medium">
              Why Athletes Choose Us
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
              Performance Benefits
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our specialized gym massage therapy delivers tangible results that directly impact your training and recovery.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-muted/50 hover:border-primary/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container-spa">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary font-medium">
              Specialized Treatments
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
              Our Gym Massage Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our range of specialized massage therapies designed specifically for fitness enthusiasts and athletes.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-background rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-muted/50"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 text-white/90 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </span>
                      <span className="px-2 py-1 bg-primary/80 rounded-full text-xs font-medium">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container-spa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Built for Athletes,
                <br />
                <span className="text-primary-foreground/80">Trusted by Champions</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                We understand the demands of serious training. Our sports massage specialists work with athletes 
                across all disciplines to help them achieve their peak performance.
              </p>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-primary-foreground/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                  alt="Athlete training"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-6 shadow-xl"
              >
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Athletes Helped</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -top-6 -right-6 bg-background rounded-2xl p-6 shadow-xl"
              >
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container-spa">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary font-medium">
              Athlete Stories
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">
              What Our Clients Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real results from real athletes who trust us with their recovery.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-muted/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="container-spa relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to Elevate Your Performance?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Don't let muscle tension and soreness hold you back. Book your sports massage session today 
              and experience the difference professional recovery can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="group relative overflow-hidden rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition-all hover:shadow-2xl hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Your Session
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-[hsl(152_25%_45%)] transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
              <Link
                to="/contact"
                className="group relative overflow-hidden rounded-full border-2 border-primary/30 bg-transparent px-10 py-4 text-lg font-semibold text-primary transition-all hover:bg-primary/5"
              >
                <span className="flex items-center justify-center gap-2">
                  Get in Touch
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GymMassage;
