"use client";

import { Project } from "@/types";
import { VideoDialog } from "@/components/video-dialog";
import { TechBadge } from "@/components/project-tech-badge";
import { ProjectLinks } from "@/components/project-links";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const baseDelay = index * 0.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: baseDelay }}
      className="h-full"
    >
      <Card className="overflow-hidden border-2 hover:border-primary/20 transition-colors h-full flex flex-col">
        <CardHeader className="p-2 text-center">{project.title}</CardHeader>
        <div className="relative w-full aspect-video bg-muted">
          <VideoDialog src={project.video} thumbnail={project.imageUrl} />
        </div>

        <CardContent className="p-4 space-y-4 flex-grow">
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: baseDelay + 0.2 }}
          >
            {project.tech.map((tech, techIndex) => (
              <TechBadge
                key={tech}
                name={tech}
                delay={baseDelay + 0.1 + techIndex * 0.1}
              />
            ))}
          </motion.div>

          <motion.p
            className="text-muted-foreground text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: baseDelay + 0.3 }}
          >
            {project.description}
          </motion.p>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <ProjectLinks
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
