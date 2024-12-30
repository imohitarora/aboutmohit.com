"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

interface VideoDialogProps {
  src: string;
  thumbnail: string;
}

export function VideoDialog({ src, thumbnail }: VideoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer w-full h-full">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <Image
            src={thumbnail}
            alt="Video thumbnail"
            width={640}
            height={360}
            className="w-full h-full object-cover"
            priority
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white transition-colors"
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogContent className="max-w-4xl w-full p-0">
        <video
          src={src}
          controls
          className="w-full aspect-video"
          autoPlay
          playsInline
        />
      </DialogContent>
    </Dialog>
  );
}
