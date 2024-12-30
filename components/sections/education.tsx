"use client"

import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Education } from '@/types';

interface EducationSectionProps {
    education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
    return (
        <motion.section
            aria-label="education"
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <motion.h3 className="text-xl sm:text-2xl font-bold mb-3">Education</motion.h3>
            {education.map((edu, index) => (
                <Card key={index} className="w-full mb-4">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold">{edu.school}</h4>
                                <p className="text-sm text-muted-foreground">{edu.degree}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">{edu.period}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </motion.section>
    );
}