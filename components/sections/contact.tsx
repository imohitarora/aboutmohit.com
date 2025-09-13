"use client";

import { Button } from "@/components/ui/button";
import { IconBrandX, IconCalendar } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface ContactSectionProps {
  twitterHandle: string;
  calendarLink?: string;
}

export function ContactSection({
  twitterHandle,
  calendarLink,
}: ContactSectionProps) {
  return (
    <motion.section
      aria-label="contact"
      className="flex flex-col items-center space-y-4 pt-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col space-y-4 items-center">
        <h4 className="text-lg font-semibold">Let&apos;s Connect!</h4>
        <p className="text-primary-300 text-center">
          Have a question or want to discuss a project? I&apos;m always open to
          interesting conversations and opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              window.open(`https://twitter.com/${twitterHandle}`, "_blank")
            }
          >
            <IconBrandX className="mr-2 h-5 w-5" />
            Message on Twitter
          </Button>

          {calendarLink && (
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open("https://cal.com/mohitarora/15min", "_ blank")
              }
            >
              <IconCalendar className="mr-2 h-5 w-5" />
              Schedule a Call
            </Button>
          )}
        </div>
      </div>

      <div className="w-full text-center mt-4">
        <p className="text-sm text-primary-300">
          looking forward to connecting!
        </p>
      </div>
    </motion.section>
  );
}
