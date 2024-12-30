"use client";

import { BackToTop } from "@/components/back-to-top";
import { FloatingDock } from "@/components/floating-dock";
import { InteractiveCanvas } from "@/components/interacting-canvas";
import { ProjectsGrid } from "@/components/projects-grid";
import { mohit } from "@/lib/data";
import { getNavLinks } from "@/lib/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { ProjectsHeader } from "../../components/projects-grid-header";

export default function ProjectsHome() {
  const ref = useRef(null);
  const theme = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const links = getNavLinks(mohit.links);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <InteractiveCanvas mode={(theme.resolvedTheme as "light") || "dark"} />
      <motion.div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />
      <main className="flex min-h-dvh flex-col space-y-8 text-sm sm:text-base">
        <ProjectsHeader />
        <BackToTop />
        <ProjectsGrid projects={mohit.portfolio} />
        <FloatingDock
          items={links}
          desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
          mobileClassName="fixed bottom-4 right-4"
        />
      </main>
    </div>
  );
}
