"use client";
import React, { useState } from "react";
import { motion, Variants , AnimatePresence} from "framer-motion";
import { ArrowUpRight, Github, FolderGit2 } from "lucide-react";
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

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Projects() {
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredProjects = filter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category.includes(filter) || (filter === "Web" && project.category === "Full Stack"));

  return (
    <div className="min-h-screen mesh-gradient-bg text-white font-sans selection:bg-cyan-500/30 selection:text-white">

      {/* --- HEADER --- */}
      <section className="pt-40 pb-12 px-6 max-w-6xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase mb-4 block">
            My Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold">Work.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collection of projects that demonstrate my journey in Full Stack development, from backend architecture to pixel-perfect mobile apps.
          </p>
        </motion.div>
      </section>

      {/* --- FILTER TABS --- */}
      <section className="px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {['All', 'Full Stack', 'Mobile'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                filter === category 
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                  : "bg-neutral-900/60 text-gray-400 border-white/5 hover:border-cyan-500/30 hover:text-cyan-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* --- PROJECTS GRID --- */}
      <section className="pb-32 px-6 max-w-6xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group flex flex-col glow-card overflow-hidden"
              >
                
                {/* Visual Header (Project Image) */}
                <div className="h-48 relative overflow-hidden bg-neutral-950 border-b border-white/5">
                   <Image 
                     src={project.image} 
                     alt={project.title}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   
                   {/* Overlay links on hover */}
                   <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                     <Link 
                       href={project.link} 
                       className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                     >
                       <ArrowUpRight size={18} />
                     </Link>
                     <a 
                       href={project.github} 
                       target="_blank"
                       rel="noreferrer"
                       className="p-3 bg-neutral-900 text-white rounded-full border border-white/10 hover:border-white hover:scale-110 transition-transform"
                     >
                       <Github size={18} />
                     </a>
                   </div>
                </div>

                {/* Content Body */}
                <div className="p-6.5 flex flex-col flex-grow">
                  <div className="mb-4 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">{project.category}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 pt-2">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Tech Stack Tags & Footer */}
                  <div className="mt-auto pt-5 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[9px] font-medium bg-white/5 text-gray-400 rounded border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={project.link} 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-cyan-400 transition-colors group/link"
                    >
                      View Project <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
}