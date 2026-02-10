import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const AnimatedSection = ({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  const getInitial = () => {
    switch (direction) {
      case "left": return { opacity: 0, x: -40 };
      case "right": return { opacity: 0, x: 40 };
      case "none": return { opacity: 0 };
      default: return { opacity: 0, y: 30 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "left":
      case "right": return { opacity: 1, x: 0 };
      case "none": return { opacity: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getAnimate());
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={controls}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
