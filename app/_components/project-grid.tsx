"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/types";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import VideoModal from "./video-modal";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMore = () => {
    setVisibleProjects((prevVisible) =>
      Math.min(prevVisible + 3, projects.length)
    );
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.slice(0, visibleProjects).map((project, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="p-2">
              <div
                className="relative group cursor-pointer overflow-hidden rounded-t-lg"
                onClick={() => setSelectedVideo(project.video)}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="mt-2">{project.title}</CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {project.liveUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      {visibleProjects < projects.length && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
      <VideoModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
