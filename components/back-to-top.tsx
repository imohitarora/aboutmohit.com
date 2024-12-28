"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronUp } from "lucide-react";

export const BackToTop = () => {
  const { scrollYProgress } = useScroll();

  const springConfig = {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  };

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const springOpacity = useSpring(opacity, springConfig);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      style={{ opacity: springOpacity }}
      className="fixed bottom-4 right-16 z-[100]"
    >
      <div className="group relative">
        <motion.button
          name="Back to top"
          onClick={scrollToTop}
          className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={springConfig}
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
        <span className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          Back to top
        </span>
      </div>
    </motion.div>
  );
};
