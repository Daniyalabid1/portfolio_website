export type SkillCategory = {
  title: string;
  icon: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "◈",
    skills: ["React", "Next.js", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Three.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: "◉",
    skills: ["Python", "Django", "FastAPI", "Node.js", "RESTful APIs"],
  },
  {
    title: "Databases",
    icon: "◫",
    skills: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Tools & DevOps",
    icon: "◌",
    skills: ["Git", "GitHub", "Docker", "VS Code", "S3 / AWS", "Mapbox"],
  },
  {
    title: "3D & Spatial",
    icon: "◈",
    skills: ["Three.js", "React Three Fiber", "Mapbox", "SAM Segmentation", "ComfyUI"],
  },
];
