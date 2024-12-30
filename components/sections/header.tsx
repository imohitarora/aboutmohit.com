"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Profile } from "@/types";

const MotionImage = motion.create(Image);

interface HeaderSectionProps {
  profile: Pick<Profile, "name" | "title">;
  avatarUrl: string;
}

export function HeaderSection({ profile, avatarUrl }: HeaderSectionProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    if (isPreviewOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isPreviewOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsPreviewOpen(false);
    }
  };

  return (
    <>
      <motion.section
        aria-label="header"
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="flex w-full justify-between gap-4 items-center">
          <div>
            <motion.h1
              className="font-bold mb-2 text-4xl sm:text-5xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hello 👋🏼 from {profile.name.split(" ")[0]}
            </motion.h1>
            <motion.h2
              className="sm:text-xl text-muted-foreground text-base font-medium"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {profile.title}
            </motion.h2>
          </div>
          <motion.div className="relative">
            <MotionImage
              width={80}
              height={80}
              src={avatarUrl}
              alt={`${profile.name}'s Avatar`}
              className="rounded-full cursor-pointer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onClick={() => setIsPreviewOpen(true)}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {isPreviewOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
            />
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={handleBackdropClick}
            >
              <Image
                src={avatarUrl}
                alt={`${profile.name}'s Avatar`}
                width={400}
                height={400}
                className="rounded-full aspect-square object-cover border-4 border-white/10 shadow-2xl"
                priority
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
