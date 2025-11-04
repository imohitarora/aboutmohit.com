import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the portfolio of projects by Mohit Arora, showcasing expertise in cloud architecture, full-stack development, and DevOps solutions.",
  alternates: {
    canonical: "https://aboutmohit.com/projects",
  },
  openGraph: {
    title: "Projects | Mohit Arora",
    description:
      "Explore the portfolio of projects by Mohit Arora, showcasing expertise in cloud architecture, full-stack development, and DevOps solutions.",
    url: "https://aboutmohit.com/projects",
  },
  twitter: {
    title: "Projects | Mohit Arora",
    description:
      "Explore the portfolio of projects by Mohit Arora, showcasing expertise in cloud architecture, full-stack development, and DevOps solutions.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
