import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Daniyal Abid — Software Engineer",
  description:
    "Software Engineer specializing in frontend development, 3D visualization, and AI integration. Building scalable web applications with React, Next.js, Three.js, and Python.",
  keywords: ["Software Engineer", "Frontend Developer", "React", "Next.js", "Three.js", "Islamabad"],
  authors: [{ name: "Daniyal Abid" }],
  openGraph: {
    title: "Daniyal Abid — Software Engineer",
    description:
      "Software Engineer specializing in frontend development, 3D visualization, and AI integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}

