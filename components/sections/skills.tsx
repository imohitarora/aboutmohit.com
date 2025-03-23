"use client";;
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  DiAws,
  DiDocker,
  DiJava,
  DiJavascript1,
  DiJenkins,
  DiMongodb,
  DiMysql,
  DiNodejsSmall,
  DiPostgresql,
  DiPython,
  DiReact,
  DiRedis,
  DiDatabase,
} from "react-icons/di";
import {
  SiGraphql,
  SiOpenai,
  SiTailwindcss,
  SiNestjs,
  SiNextdotjs,
  SiApachekafka,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { TbSql } from "react-icons/tb";
import { RiMicrosoftLoopLine } from "react-icons/ri";

import type { JSX } from "react";

interface SkillsSectionProps {
  skills: string[];
}

const skillIcons: { [key: string]: JSX.Element } = {
  "Node.js": <DiNodejsSmall />, 
  NestJS: <SiNestjs />,
  "Next JS": <SiNextdotjs />,
  React: <DiReact />,
  Python: <DiPython />,
  GraphQL: <SiGraphql />,
  "Microsoft Azure": <VscAzure />,
  "Azure Open AI": <SiOpenai />,
  AWS: <DiAws />,
  Java: <DiJava />,
  Javascript: <DiJavascript1 />,
  Docker: <DiDocker />,
  MSSQL: <DiDatabase />,
  MySQL: <DiMysql />,
  PostgreSQL: <DiPostgresql />,
  MongoDB: <DiMongodb />,
  Redis: <DiRedis />,
  Kafka: <SiApachekafka />,
  TailwindCSS: <SiTailwindcss />,
  "Power BI": <RiMicrosoftLoopLine />,
  SQL: <TbSql />,
  Jenkins: <DiJenkins />,
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <motion.section
      aria-label="skills"
      className="flex flex-col items-start"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.h3 className="text-xl sm:text-2xl font-bold mb-3">
        Skills
      </motion.h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <Badge
            variant="secondary"
            key={skill}
            className="cursor-pointer text-xs flex items-center gap-2"
          >
            {skillIcons[skill] || <DiDatabase />} {/* Fallback icon */}
            {skill}
          </Badge>
        ))}
      </div>
    </motion.section>
  );
}
