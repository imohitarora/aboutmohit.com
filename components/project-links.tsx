"use client";

import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectLinksProps {
  liveUrl: string;
  githubUrl: string;
}

export function ProjectLinks({ liveUrl, githubUrl }: ProjectLinksProps) {
  if (!liveUrl && !githubUrl) return null;

  return (
    <motion.div 
      className="flex gap-3 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {liveUrl && (
        <Button asChild variant="default" className="flex-1" size="sm">
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <Globe className="mr-2 h-4 w-4" />
            Live Site
          </a>
        </Button>
      )}
      {githubUrl && (
        <Button asChild variant="outline" className="flex-1" size="sm">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <Github className="mr-2 h-4 w-4" />
            Source Code
          </a>
        </Button>
      )}
    </motion.div>
  );
}