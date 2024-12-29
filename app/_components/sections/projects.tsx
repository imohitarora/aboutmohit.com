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
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import VideoModal from "../video-modal";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
}

const truncateDescription = (description: string, maxLength: number = 100) => {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength) + "...";
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSteps = Math.ceil(projects.length / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        // Instead of resetting, keep incrementing
        if (current >= totalSteps - 1) {
          // When reaching end, reset transform immediately
          setTimeout(() => setActiveIndex(0), 0);
          return current;
        }
        return current + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSteps]);

  const renderProjectCard = (project: Project, index: number) => (
    <Card key={index} className="h-full dark:bg-slate-900 w-full">
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
        <CardDescription className="mt-2 text-slate-400 h-[4.5em] overflow-hidden">
          {truncateDescription(project.description)}
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
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
  );

  return (
    <motion.section
      aria-label="projects"
      className="space-y-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h3 className="text-3xl font-bold">Projects</motion.h3>

      <div className="relative overflow-hidden">
        <div className="transition-all duration-700 ease-in-out">
          <div
            className="flex"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition:
                activeIndex === 0 ? "none" : "transform 0.7s ease-in-out",
            }}
          >
            {/* Duplicate projects array for seamless loop */}
            {[...projects, ...projects].map((project, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 flex-shrink-0 px-2"
                style={{
                  opacity: Math.floor(index / 2) === activeIndex ? 1 : 0,
                  transition: "opacity 0.7s ease-in-out",
                }}
              >
                {renderProjectCard(project, index)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-gray-400" : "bg-gray-400/20"
              }`}
              aria-label={`Go to projects ${index * 2 + 1} and ${
                index * 2 + 2
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mt-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          See all projects
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </motion.div>

      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </motion.section>
  );
}
