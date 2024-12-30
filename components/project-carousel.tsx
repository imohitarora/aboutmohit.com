"use client";

import { ProjectCard } from "@/components/project-card";
import { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((current) => (current + 1) % projects.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard project={projects[currentIndex]} index={0} />
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrevious}
          className="bg-gray-800/60 hover:bg-gray-800/80 text-white p-2 rounded-full w-12 h-12"
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-800/60 hover:bg-gray-800/80 text-white p-2 rounded-full w-12 h-12"
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </div>

    // there is a height issue in this, what is it ?
  );
}
