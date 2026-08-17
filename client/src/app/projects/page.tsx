"use client";
import React, { useState, useRef, MouseEvent, CSSProperties } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- PROJECT DATA ---
const projectsData = [
  {
    id: 1,
    title: "Harmoni",
    category: "Full Stack",
    description: "An All-in-One Collaboration Hub combining real-time messaging, task management, and file sharing.",
    tech: ["NestJS", "Next.js", "Prisma ORM", "PostgreSQL", "Redux", "Redis", "Docker"],
    image: "/images/harmoniproject.png",
    link: "/projects/harmoni",
    github: "#"
  },
  {
    id: 2,
    title: "ClientBridge",
    category: "Full Stack",
    description: "Introducing ClientBridge, A dedicated collaboration platform where freelancers and clients stay on the same page.",
    tech: ["Next.js", "Node.js", "Prisma ORM", "PostgreSQL", "Socket.io", "Tailwind CSS"],
    image: "/images/clientbridge.png",
    link: "/projects/clientbridge",
    github: "https://github.com/itx-tayyab/ClientBridge"
  },
  {
    id: 3,
    title: "Covid19 Tracker App",
    category: "Mobile",
    description: "A Mobile app where user can easily check cases and all results related to Covid19 in their country.",
    tech: ["Flutter", "MVVM Architecture", "Provider", "Rest API"],
    image: "/images/covid19project.png",
    link: "/projects/covid19-tracker-app",
    github: "https://github.com/itx-tayyab/covid19_tracker_app_with_api"
  },
  {
    id: 4,
    title: "Weather App",
    category: "Mobile",
    description: "A Mobile app that provides accurate weather forecasts and real-time updates using the OpenWeather API.",
    tech: ["Flutter", "MVVM Architecture", "Provider", "OpenWeather API"],
    image: "/images/weatherproject.png",
    link: "/projects/weather-app",
    github: "https://github.com/itx-tayyab/weather_app"
  }
];

// Tag Stylist (Kept your exact color scheme)
const getTagStyle = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("nestjs") || t.includes("prisma") || t.includes("redux")) {
    return "text-purple-400 bg-purple-500/10 border-purple-500/15";
  }
  if (t.includes("next") || t.includes("react") || t.includes("tailwind")) {
    return "text-cyan-400 bg-cyan-500/10 border-cyan-500/15";
  }
  if (t.includes("flutter") || t.includes("dart") || t.includes("provider")) {
    return "text-blue-400 bg-blue-500/10 border-blue-500/15";
  }
  if (t.includes("socket") || t.includes("redis") || t.includes("docker") || t.includes("node")) {
    return "text-orange-400 bg-orange-500/10 border-orange-500/15";
  }
  return "text-gray-400 bg-white/5 border-white/10";
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// --- PROJECT CARD COMPONENT (Redesigned layout, kept hover effects) ---
function ProjectCard({ project }: { project: typeof projectsData[0] }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isWeb = project.category === "Full Stack";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden group flex flex-col h-full bg-[#0a0a0c] border border-white/5 rounded-[1.5rem] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.03)]"
      style={{
        "--mouse-x": `${coords.x}px`,
        "--mouse-y": `${coords.y}px`
      } as CSSProperties}
    >
      {/* 1. Spotlight Radial Background Glow (Your advanced hover effect) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.05) 0%, transparent 80%)`
        }}
      />

      {/* 2. Spotlight Radial Border Glow (Your advanced hover effect) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(0, 240, 255, 0.3) 0%, rgba(138, 43, 226, 0.15) 50%, transparent 100%)`,
          padding: "1px",
          borderRadius: "inherit",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* 3. Image Banner Area (New Design) */}
      <Link href={project.link} className="relative w-full h-[240px] bg-neutral-900 overflow-hidden border-b border-white/5 block z-20 shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        {/* Inner shadow overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80 pointer-events-none" />
      </Link>

      {/* 4. Content Area (New Design) */}
      <div className="p-7 flex flex-col flex-grow relative z-20">
        
        {/* Header: Category & Github */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-bold tracking-widest uppercase ${isWeb ? 'text-cyan-400' : 'text-purple-400'}`}>
            {project.category}
          </span>
          {project.github !== "#" && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-500 hover:text-white transition-colors p-1"
            >
              <Github size={16} />
            </a>
          )}
        </div>

        {/* Title */}
        <Link href={project.link} className="w-fit">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech Tags (Using your original styles) */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 text-[10px] font-medium border rounded-md ${getTagStyle(t)}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5 mb-5" />

        {/* Action Link */}
        <Link
          href={project.link}
          className="inline-flex items-center text-sm font-bold text-white group-hover:text-cyan-400 transition-colors w-fit"
        >
          View Project <ArrowUpRight size={16} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function Projects() {
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter(project => project.category.includes(filter) || (filter === "Web" && project.category === "Full Stack"));

  return (
    <div className="min-h-screen mesh-gradient-bg text-white font-sans selection:bg-cyan-500/30 selection:text-white">

      {/* --- BACKGROUND Radial Glows --- */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HEADER --- */}
      <section className="pt-24 md:pt-28 pb-12 px-6 max-w-7xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase mb-4 block">
            My Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold animate-pulse">Work.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collection of projects that demonstrate my journey in Full Stack development, from backend architecture to pixel-perfect mobile apps.
          </p>
        </motion.div>
      </section>

      {/* --- SEGMENTED TABS FILTER BAR --- */}
      <section className="px-6 mb-16 relative z-20">
        <div className="relative bg-neutral-900/40 border border-white/5 p-1.5 rounded-full flex gap-1.5 w-fit mx-auto backdrop-blur-md">
          {['All', 'Full Stack', 'Mobile'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`relative px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 z-10 cursor-pointer ${
                filter === category ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter === category && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* --- PROJECTS GRID (Standardized to uniform 3-column layout) --- */}
      <section className="pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
}