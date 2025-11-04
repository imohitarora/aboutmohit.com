import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aboutmohit.com"),
  title: {
    default:
      "Mohit Arora | Software & Cloud Architect | Full-Stack Developer | DevOps Expert",
    template: "%s | Mohit Arora",
  },
  description:
    "Experienced Software & Cloud Architect with 10+ years in building scalable, secure cloud solutions. Expert in leading teams and delivering innovative projects with significant business impact.",
  keywords: [
    "Mohit Arora",
    "Software Architect",
    "Cloud Architect",
    "Full-Stack Developer",
    "DevOps Expert",
    "Node.js",
    "Next.js",
    "React",
    "Azure",
    "AWS",
    "NestJS",
    "Angular",
    "Python",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "Software Engineering",
    "Cloud Solutions",
    "Scalable Architecture",
  ],
  authors: [{ name: "Mohit Arora", url: "https://aboutmohit.com" }],
  creator: "Mohit Arora",
  publisher: "Mohit Arora",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aboutmohit.com",
  },
  openGraph: {
    url: "https://aboutmohit.com",
    siteName: "Mohit Arora - Portfolio",
    locale: "en_US",
    type: "website",
    title:
      "Mohit Arora | Software & Cloud Architect | Full-Stack Developer | DevOps Expert",
    description:
      "Experienced Software & Cloud Architect with 10+ years in building scalable, secure cloud solutions. Expert in leading teams and delivering innovative projects with significant business impact.",
    images: [
      {
        url: "/og.png",  // Much shorter!
        width: 1200,
        height: 630,
        alt: "Mohit Arora - Software & Cloud Architect",
        type: "image/png",
      },
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@aboutmohit",
    creator: "@aboutmohit",
    title:
      "Mohit Arora | Software & Cloud Architect | Full-Stack Developer | DevOps Expert",
    description:
      "Experienced Software & Cloud Architect with 10+ years in building scalable, secure cloud solutions. Expert in leading teams and delivering innovative projects with significant business impact.",
    images: [
      {
        url: "/og.png",  // Much shorter!
        width: 1200,
        height: 630,
        alt: "Mohit Arora - Software & Cloud Architect",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen font-sans antialiased",
          "bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]",
          "bg-[size:14px_24px]",
          "max-w-2xl mx-auto py-12 sm:py-24 px-6",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
