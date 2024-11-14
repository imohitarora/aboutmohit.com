import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./_components/theme-provider";
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
  title: "Mohit Arora | CTO | Software & Cloud Architect | Full-Stack Developer | DevOps Expert",
  description: "Experienced Software & Cloud Architect with 10+ years in building scalable, secure cloud solutions. Expert in leading teams and delivering innovative projects with significant business impact.",
  openGraph: {
    url: "https://aboutmohit.com",
    type: "website",
    title: "Mohit Arora | CTO | Software & Cloud Architect | Full-Stack Developer | DevOps Expert",
    description: "Experienced Software & Cloud Architect with 10+ years in building scalable, secure cloud solutions. Expert in leading teams and delivering innovative projects with significant business impact.",
    images: [{
      url: "https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/aboutmohit.com/Mohit%20Arora%20%7C%20CTO%20%7C%20Software%20%26%20Cloud%20Architect%20%7C%20Full-Stack%20Developer%20%7C%20DevOps%20Expert/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2Ff6085bc0-be40-420b-af3e-8fa11854fe83.jpg%3Ftoken%3DWCMMQZfgTcCmR1qsTuqtgDAnR9A-KpGzVtcgKeKA76Y%26height%3D1800%26width%3D1200%26expires%3D33265223856/og.png"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Arora | CTO | Software & Cloud Architect | Full-Stack Developer | DevOps Expert",
    description: "Experienced Software & Cloud Architect with 10+ years in building scalable, secure cloud solutions. Expert in leading teams and delivering innovative projects with significant business impact.",
    images: [{
      url: "https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/aboutmohit.com/Mohit%20Arora%20%7C%20CTO%20%7C%20Software%20%26%20Cloud%20Architect%20%7C%20Full-Stack%20Developer%20%7C%20DevOps%20Expert/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2Ff6085bc0-be40-420b-af3e-8fa11854fe83.jpg%3Ftoken%3DWCMMQZfgTcCmR1qsTuqtgDAnR9A-KpGzVtcgKeKA76Y%26height%3D1800%26width%3D1200%26expires%3D33265223856/og.png"
    }],
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
          'min-h-screen font-sans antialiased',
          'bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]',
          'bg-[size:14px_24px]',
          'max-w-2xl mx-auto py-12 sm:py-24 px-6',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
