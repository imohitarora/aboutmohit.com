"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Experience } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.section
      aria-label="work-experience"
      className="flex flex-col items-start"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h3
        className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Work Experience
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.h3>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {experience.map((job, index) => (
              <Card key={index} className="w-full mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold flex items-center gap-2">
                        {job.company.includes("(Startup)") ? (
                          <>
                            {job.company.replace("(Startup)", "")}
                            <span className="px-1.5 py-0.5 text-xs text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-700 rounded-full ml-1">
                              Startup
                            </span>
                          </>
                        ) : (
                          job.company
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {job.title}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {job.period}
                    </span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {job.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
