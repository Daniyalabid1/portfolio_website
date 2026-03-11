export type Experience = {
  id: number;
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
  current?: boolean;
};

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "IMARAT Group of Companies",
    duration: "May 2025 — Present",
    location: "Islamabad, Pakistan",
    current: true,
    bullets: [
      "Developed and maintained frontend systems for HouseGen and UrbanGen — IMARAT's AI platforms for architectural and urban design automation.",
      "Built Three.js-based 3D visualization for UrbanGen enabling interactive exploration of AI-generated city layouts, converting lat/lng data into accurate spatial coordinate systems.",
      "Designed Redis-based queueing pipelines for asynchronous rendering and integrated SAM-based segmentation and diffusion inpainting workflows for AI-assisted design editing.",
      "Integrated ComfyUI rendering workflows to automate rendering requests directly from the UrbanGen Three.js visualization interface.",
    ],
  },
  {
    id: 2,
    role: "Junior Frontend Developer",
    company: "Brainhub Labs",
    duration: "Jun 2023 — Sep 2023",
    location: "Islamabad, Pakistan",
    current: false,
    bullets: [
      "Developed responsive UI components from Figma designs and integrated RESTful APIs, collaborating closely with backend teams to resolve cross-functional technical issues.",
      "Built static business websites with custom animations for clients across sectors including dental clinics and pet services.",
      "Contributed to code reviews via Git pull requests and resolved version control conflicts in a team environment.",
    ],
  },
];
