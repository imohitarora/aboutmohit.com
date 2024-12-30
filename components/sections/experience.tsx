"use client"

import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Experience } from '@/types';

interface ExperienceSectionProps {
    experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
    return (
        <motion.section
            aria-label="work-experience"
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <motion.h3 className="text-xl sm:text-2xl font-bold mb-3">Work Experience</motion.h3>
            {experience.map((job, index) => (
                <Card key={index} className="w-full mb-4">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold">{job.company}</h4>
                                <p className="text-sm text-muted-foreground">{job.title}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">{job.period}</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {job.responsibilities.map((responsibility, i) => (
                                <li key={i}>{responsibility}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </motion.section>
    );
}