"use client";

import { mohit } from "@/lib/data";
import { getNavLinks } from "@/lib/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FloatingDock } from "../components/floating-dock";
import { AboutSection } from "../components/sections/about";
import { ContactSection } from "../components/sections/contact";
import { EducationSection } from "../components/sections/education";
import { ExperienceSection } from "../components/sections/experience";
import { HeaderSection } from "../components/sections/header";
import { BackToTop } from "@/components/back-to-top";
import { useTheme } from "next-themes";
import { InteractiveCanvas } from "../components/interacting-canvas";
import { ProjectsSection } from "../components/sections/projects";
import { SkillsSection } from "../components/sections/skills";

export default function Home() {
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
      <BackToTop />
      <motion.div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />
      <main className="flex min-h-dvh flex-col space-y-8 text-sm sm:text-base">
        <HeaderSection
          profile={mohit}
          avatarUrl="https://assets.aboutmohit.com/avatar-mohit.jpeg"
        />
        <AboutSection profile={mohit} />
        <SkillsSection skills={mohit.skills} />
        <ProjectsSection projects={mohit.portfolio} />
        <ExperienceSection experience={mohit.experience} />
        <EducationSection education={mohit.education} />
        <ContactSection
          twitterHandle={mohit.links.twitter}
          calendarLink="mohitarora/15min"
        />
        <FloatingDock
          items={links}
          desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
          mobileClassName="fixed bottom-4 right-4"
        />
      </main>
    </div>
  );
}
