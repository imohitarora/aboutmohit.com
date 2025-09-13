"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Education } from "@/types";
import { ChevronDown } from "lucide-react";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.section
      aria-label="education"
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
        Education
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
            {education.map((edu, index) => (
              <Card key={index} className="w-full mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold">{edu.school}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {edu.period}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
