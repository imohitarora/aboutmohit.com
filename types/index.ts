export interface Profile {
  name: string;
  title: string;
  summary: string;
  links: {
    resume: string;
    github: string;
    twitter: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  portfolio: Project[];
}

export interface Experience {
  company: string;
  title: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Project {
  video: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

export interface NavLink {
  title: string;
  icon: React.ReactNode;
  href: string;
  openBlank: boolean;
}
