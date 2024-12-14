"use client";

import { mohit } from "@/lib/data";
import { getNavLinks } from "@/lib/navigation";
import { getCalApi } from "@calcom/embed-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FloatingDock } from "./_components/floating-dock";
import { AboutSection } from "./_components/sections/about";
import { ContactSection } from "./_components/sections/contact";
import { EducationSection } from "./_components/sections/education";
import { ExperienceSection } from "./_components/sections/experience";
import { HeaderSection } from "./_components/sections/header";
import { ProjectsSection } from "./_components/sections/projects";
import { SkillsSection } from "./_components/sections/skills";
import { InteractiveCanvas } from "./_components/interacting-canvas";
import { useTheme } from "next-themes";

export default function Home() {
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
