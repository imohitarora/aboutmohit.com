"use client";

import { motion } from "framer-motion";

export function ProjectsHeader() {
  return (
    <motion.header
      className="relative z-10 max-w-5xl pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Projects & Work
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            A collection of projects I&apos;ve worked on, from web applications
            to open source contributions and experiments.
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
}
