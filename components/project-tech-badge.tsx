"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  delay?: number;
}

export function TechBadge({ name, delay = 0 }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.2 }}
    >
      <Badge 
        variant="secondary" 
        className="text-xs font-medium px-2 py-0.5 bg-primary/5 hover:bg-primary/10 transition-colors"
      >
        {name}
      </Badge>
    </motion.div>
  );
}