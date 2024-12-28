"use client";

import { FloatingDock } from "@/app/_components/floating-dock";
import { InteractiveCanvas } from "@/app/_components/interacting-canvas";
import { mohit } from "@/lib/data";
import { getNavLinks } from "@/lib/navigation";
import { getCalApi } from "@calcom/embed-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import ProjectGrid from "../_components/project-grid";
import { ProjectsHeader } from "../_components/projects-grid-header";
import { BackToTop } from "@/components/back-to-top";

export default function ProjectsHome() {
  const ref = useRef(null);
  const theme = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

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
        <ProjectGrid projects={mohit.portfolio} />
        <FloatingDock
          items={links}
          desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
          mobileClassName="fixed bottom-4 right-4"
        />
      </main>
    </div>
  );
}
