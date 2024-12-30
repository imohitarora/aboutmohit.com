"use client";

import { ProjectsGrid } from "@/components/projects-grid";
import { Project } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.section
      aria-label="projects"
      className="space-y-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h3 className="text-3xl font-bold">Projects</motion.h3>
      <ProjectsGrid projects={projects} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mt-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          See all projects
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </motion.div>
    </motion.section>
  );
}
