"use client";
import React, { useState } from "react";
import { motion, Variants , AnimatePresence} from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, Code2, FolderGit2, Smartphone, Globe, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- PROJECT DATA ---
// You can add more projects here easily
const projectsData = [
  {
    id: 1,
    title: "Harmoni",
    category: "Full Stack",
    description: "An All-in-One Collaboration Hub combining real-time messaging, task management, and file sharing.",
    tech: ["NestJS", "Next.js", "Prisma ORM", "PostgreSQL", "Redux", "Redis", "Docker"],
    gradient: "from-indigo-900 via-purple-900 to-cyan-900", 
    image: "/images/harmoniproject.png",
    link: "/projects/harmoni",
    github: "#"
  },
  {
    id: 2,
    title: "Covid19 Tracker App",
    category: "Mobile",
    description: "A Mobile app where user can easily check cases and all results related to Covid19 in their country.",
    tech: ["Flutter", "Mvvm Architecture", "Provider", "Rest API"],
    gradient: "from-slate-700 to-slate-900",
    image: "/images/covid19project.png",
    link: "/projects/covid19-tracker-app",
    github: "https://github.com/itx-tayyab/covid19_tracker_app_with_api"
  },
  {
    id: 3,
    title: "Weather App",
    category: "Mobile",
    description: "A Mobile app that provides accurate weather forecasts and real-time updates using the OpenWeather API.",
    tech: ["Flutter", "MVVM Architecture", "Provider", "OpenWeather API"],
    gradient: "from-emerald-800 to-yellow-900/40",
    image: "/images/weatherproject.png",
    link: "/projects/weather-app",
    github: "https://github.com/itx-tayyab/weather_app"
  },
  
];

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

export default function Projects() {
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredProjects = filter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category.includes(filter) || (filter === "Web" && project.category === "Full Stack"));

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black font-sans">

      {/* --- HEADER --- */}
      <section className="pt-40 pb-12 px-6 max-w-6xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-4 block">
            My Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Work.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collection of projects that demonstrate my journey in Full Stack development, from backend architecture to pixel-perfect mobile apps.
          </p>
        </motion.div>
      </section>

      {/* --- FILTER TABS --- */}
      <section className="px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {['All', 'Full Stack', 'Mobile', 'AI / ML'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                filter === category 
                  ? "bg-white text-black border-white" 
                  : "bg-neutral-900 text-gray-400 border-white/10 hover:border-cyan-500/50 hover:text-cyan-400"
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
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group flex flex-col rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                
                {/* Visual Header (Project Image) */}
                <div className="h-48 relative overflow-hidden bg-neutral-800">
                   <Image 
                     src={project.image} 
                     alt={project.title}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   
                   {/* Overlay link icon on hover */}
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <Link href={project.link} className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"><ArrowUpRight size={20} /></Link>
                     <a href={project.github} className="p-2 bg-neutral-900 rounded-full text-white hover:scale-110 transition-transform"><Github size={20} /></a>
                   </div>
                </div>

                {/* Content Body */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-2xl font-bold mt-2 mb-3 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Tech Stack Tags & Footer */}
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-1 text-[10px] bg-white/5 text-gray-300 rounded border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={project.link} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                      View Project <ArrowUpRight size={16} />
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