"use client";

import { ProjectCard } from "@/components/project-card";
import { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto auto-rows-fr">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
