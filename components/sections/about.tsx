"use client";

import { Button } from "@/components/ui/button";
import { Profile } from "@/types";
import { IconExternalLink, IconMail } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  profile: Pick<Profile, "summary" | "links">;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <motion.section
      aria-label="about"
      className="flex flex-col items-start space-y-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h3 className="text-lg sm:text-xl font-bold">About</motion.h3>

      <motion.div className="space-y-2">
        <motion.h4 className="font-semibold text-base">What I Do</motion.h4>
        <motion.p className="text-sm text-muted-foreground">
          I&apos;m Software & Cloud Architect at{" "}
          <a
            href="https://indietech.ai"
            target="_blank"
            className="underline text-foreground"
          >
            Indie Tech
          </a>
          , where I guide the technical vision and craft scalable cloud
          architectures on Azure and AWS.
        </motion.p>
        {/* <motion.p className="text-sm text-muted-foreground">
                    On the side, I run <a href="https://gracensity.com" target='_blank' className="underline text-foreground">Gracensity</a> as a hobby and learning platform, where I build cutting-edge full-stack apps with modern tech stacks.
                </motion.p> */}
      </motion.div>

      <motion.div className="space-y-2">
        <motion.h4 className="font-semibold text-base">
          Professional Journey
        </motion.h4>
        <motion.p className="text-sm text-muted-foreground">
          With over a decade of experience as a Software & Cloud Architect, I
          specialize in building secure, scalable cloud solutions. I lead teams
          to create impactful and innovative projects that drive business
          success.
        </motion.p>
      </motion.div>

      {/* Personal Interests */}
      <motion.div className="space-y-2">
        <motion.h4 className="font-semibold text-base">Beyond Coding</motion.h4>
        <motion.ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>
            I enjoy traveling, exploring different foods, and watching movies
            and series
          </li>
          <li>Science fiction novels keep my imagination sharp</li>
          <li>Photography is my way of capturing stories through a lens</li>
        </motion.ul>
        <motion.p className="text-sm text-muted-foreground">
          If you&apos;re in the Toronto area and love talking about technology,
          feel free to reach out—I&apos;d be happy to meet up and chat!
        </motion.p>
      </motion.div>

      {/* Call to Action */}
      <motion.div className="flex gap-4 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(profile.links.resume, "_blank")}
        >
          <IconExternalLink className="mr-2 h-4 w-4" />
          View Resume
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            window.open("https://cal.com/mohitarora/15min", "_ blank")
          }
        >
          <IconMail className="mr-2 h-4 w-4" />
          Get in Touch
        </Button>
      </motion.div>
    </motion.section>
  );
}
