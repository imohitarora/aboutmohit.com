"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = "";
      document.body.style.paddingRight = "0px";
    };
  }, [isLocked]);
};

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useScrollLock(isOpen);

  useEffect(() => {
    setIsOpen(!!videoUrl);
  }, [videoUrl]);

  // Add ESC key handler
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (!videoUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <video
          ref={videoRef}
          controls
          className="w-full rounded-lg"
          preload="metadata"
          onClick={handleVideoClick}
          src={videoUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
}
