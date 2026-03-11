export type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  featured?: boolean;
  tag?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "HouseGen — AI Architectural Platform",
    description:
      "Frontend system for IMARAT's AI-driven house generation platform. Built Three.js interior visualizations with accurate spatial rendering, dynamic asset placement, and Redis-based queueing pipelines for asynchronous AI rendering tasks.",
    tech: ["Next.js", "Three.js", "FastAPI", "Redis", "S3", "SAM Segmentation"],
    github: "https://github.com/Daniyalabid1",
    demo: "#",
    featured: true,
    tag: "Work Project",
  },
  {
    id: 2,
    title: "UrbanGen — 3D City Planning Tool",
    description:
      "Interactive urban design platform with Three.js-based city layout visualization. Converted geo-spatial lat/lng data into accurate Three.js coordinate systems and integrated ComfyUI rendering workflows directly from the visualization interface.",
    tech: ["React", "Three.js", "Mapbox", "Django", "ComfyUI", "Python"],
    github: "https://github.com/Daniyalabid1",
    demo: "#",
    featured: true,
    tag: "Work Project",
  },
  {
    id: 3,
    title: "Proctoring Network",
    description:
      "Secure remote exam proctoring platform using AI, computer vision, and biometric authentication. Features face verification, voice analysis, automated test generation, developer tools surveillance, and multi-tab monitoring.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Computer Vision", "AI/ML"],
    github: "https://github.com/Daniyalabid1",
    demo: "#",
    featured: true,
    tag: "Final Year Project",
  },
  {
    id: 4,
    title: "Maxify Marketing Website",
    description:
      "Dynamic marketing platform built with React, featuring live data integration via backend APIs, responsive design for all screen sizes, and interactive frontend components including carousels, modals, and lead capture forms.",
    tech: ["React", "JavaScript", "REST APIs", "CSS3", "Responsive Design"],
    github: "https://github.com/Daniyalabid1",
    demo: "#",
    tag: "Freelance",
  },
];
