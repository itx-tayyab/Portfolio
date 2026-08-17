"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  ArrowLeft, Github, ExternalLink, Calendar, Layers, 
  CheckCircle2, AlertCircle, Code2, ArrowUpRight, 
  ChevronLeft, ChevronRight, Trophy, Lightbulb, ListChecks
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

// --- MOCK DATA ---
const projectsDB = {
  "harmoni": {
    title: "Harmoni",
    tagline: "All-in-one Collaboration Tool",
    status: "In Progress",
    date: "Dec 2024",
    repoLink: "https://github.com/yourusername/harmoni",
    liveLink: "https://harmoni.app",
    gradient: "from-indigo-950/40 via-cyan-950/20 to-neutral-950/10",
    
    images: [
      "/images/harmonidashboard.png",
      "/images/harmoniteam.png",
      "/images/harmoniteampage.png",
      "/images/harmoniteamembers.png",
    ],
    
    problem: "Remote teams often struggle with fragmentation. They use Slack for messaging, Trello for tasks, and Google Drive for files. Switching between these apps kills productivity and breaks flow.",
    solution: "Harmoni unifies these three pillars into a single interface. I architected a Microservices-ready backend using NestJS to handle real-time WebSocket connections for messaging while simultaneously managing relational data for tasks in PostgreSQL.",
    
    features: [
      "Real-time Messaging with Socket.io",
      "Drag-and-Drop Task Kanban Board",
      "Secure File Sharing & Preview",
      "AI Meeting Assistant & Summarizer",
      "Role-based Access Control (RBAC)"
    ],
    
    techStack: ["NestJS", "Next.js", "Socket.io", "PostgreSQL", "Redis", "Shadcn UI"],
    
    learnings: [
      "Mastered Microservices communication patterns (TCP/Redis)",
      "Optimized WebSocket performance for 1000+ concurrent users",
      "Implemented complex state management for real-time updates"
    ],
    
    achievements: [
      "Reduced context-switching time by 40% in beta testing",
      "Successfully deployed on AWS with Docker Swarm"
    ]
  },
  "covid19-tracker-app": {
    title: "Covid19 Tracker App",
    tagline: "Global Pandemic Tracking System",
    status: "Completed",
    date: "July 2025",
    repoLink: "https://github.com/itx-tayyab/covid19_tracker_app_with_api",
    liveLink: "#",
    gradient: "from-slate-900/40 via-neutral-950/20 to-neutral-950/10",
    
    images: [
      "/images/covid-main.png",
      "/images/covid-stats.png"
    ],
 
    problem: "During the pandemic, accessing consolidated, real-time data on infection rates across specific cities and countries was difficult for the general public.",
    solution: "We built a mobile app that aggregates data from global APIs and presents it in an easy-to-read dashboard, allowing users to filter by country and city.",
    
    features: [
      "Global & Country-wise Statistics",
      "Visual Graphs for Active/Recovered Cases",
      "Search Functionality by Country",
      "Offline Data Caching"
    ],
 
    techStack: ["Flutter", "MVVM Architecture", "Provider", "Rest API"],
    
    learnings: [
      "Parsing complex nested JSON data in Dart",
      "Implementing MVVM for clean code separation",
      "Handling API errors and network timeouts gracefully"
    ],
 
    achievements: [
      "Achieved 99.9% crash-free sessions",
      "Simplified complex data for non-technical users"
    ]
  },
  "weather-app": {
    title: "Weather App",
    tagline: "Real-time Climate Forecast",
    status: "Completed",
    date: "August 2025",
    repoLink: "https://github.com/itx-tayyab/weather_app",
    liveLink: "#",
    gradient: "from-emerald-950/40 via-neutral-950/20 to-neutral-950/10",
    
    images: [
      "/images/weather-home.png"
    ],
 
    problem: "Accessing real-time weather data often requires multiple platforms and complex interfaces.",
    solution: "Developed a cross-platform Flutter app integrated with a weather API to provide fast, accurate weather updates in a user-friendly design.",
    
    features: [
      "Geolocation-based Weather Detection",
      "7-Day Forecast",
      "Dynamic Backgrounds based on Weather",
      "Search any City"
    ],
 
    techStack: ["Flutter", "MVVM Architecture", "Provider", "OpenWeather API"],
    
    learnings: [
      "Working with Location Services Permissions",
      "Managing Asynchronous Data Streams in Flutter"
    ],
    
    achievements: [
      "Reduced API calls by implementing local caching",
      "Smooth 60fps animations"
    ]
  },
  "clientbridge": {
    title: "ClientBridge",
    tagline: "Freelancer Collaboration Platform",
    status: "Completed",
    date: "January 2026",
    repoLink: "https://github.com/itx-tayyab/ClientBridge",
    liveLink: "#",
    gradient: "from-teal-950/40 via-neutral-950/20 to-neutral-950/10",
    
    images: [
      "/images/CBpage1.png",
      "/images/CBpage2.png",
      "/images/CBregister.png",
      "/images/CBlogin.png",
      "/images/CbFrdash.png",
      "/images/CbFrproject.png",
      "/images/CbFrClient.png",
      "/images/Cbmessage.png",
    ],
 
    problem: "Freelancers and clients often struggle to collaborate effectively due to communication gaps.",
    solution: "Built a dedicated platform that streamlines communication, task management, and file sharing between freelancers and clients.",
    
    features: [
      "Real-time Messaging",
      "Task Management System",
      "File Sharing & Version Control",
      "Client Feedback Integration"
    ],
 
    techStack: ["React", "Next.js", "Express.js", "Socket.io", "Tailwind CSS"],
    
    learnings: [
      "Client invitation and onboarding flows",
      "Real-time communication with Socket.io",
      "Implementing secure file uploads and storage"
    ],
    
    achievements: [
      "Mastered Prisma ORM to handle intricate One-to-Many and Many-to-Many relationships between Freelancers, Clients, Projects, and Invites.",
      "Implemented secure JWT authentication and protected routes to ensure clients can only view their own assigned data."
    ]
  }
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function ProjectDetails() {
  const params = useParams();
  const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;
  const project = projectsDB[projectId as keyof typeof projectsDB];
  
  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-black mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-cyan-400 hover:underline text-sm font-semibold">Back to Projects</Link>
      </div>
    );
  }

  const nextImage = () => {
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const openLightbox = () => {
    if (project.images && project.images.length > 0) {
      setIsLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="min-h-screen mesh-gradient-bg text-white font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* --- HERO HEADER --- */}
      <section className={`relative pt-24 md:pt-28 pb-20 px-6 bg-gradient-to-b ${project.gradient} to-transparent border-b border-white/5`}>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`px-3.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-2 ${
                project.status === "Completed" 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-orange-500/10 text-orange-400 border-orange-500/20"
              }`}>
                {project.status === "Completed" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                {project.status}
              </span>
              <span className="text-gray-400 text-xs font-semibold flex items-center gap-2">
                <Calendar size={14} className="text-cyan-400" /> {project.date}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">{project.title}</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">{project.tagline}</p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href={project.repoLink} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-400/10 flex items-center gap-2"
              >
                <Github size={18} /> View Code
              </a>
              {project.liveLink !== "#" && (
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <ExternalLink size={18} className="text-cyan-400" /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* 1. IMAGE CAROUSEL */}
            <div className="relative w-full aspect-video bg-neutral-950/60 border border-white/5 rounded-2xl overflow-hidden group shadow-2xl">
               {project.images && project.images.length > 0 ? (
                 <>
                   <button
                     type="button"
                     onClick={openLightbox}
                     className="relative block h-full w-full cursor-zoom-in"
                     aria-label="Open image viewer"
                   >
                     <Image 
                       src={project.images[currentImageIndex]} 
                       alt={`${project.title} screenshot`}
                       fill
                       className="object-contain"
                       priority
                     />
                   </button>
                   
                   {/* Carousel Controls */}
                   {project.images.length > 1 && (
                     <>
                        <button 
                          type="button" 
                          onClick={prevImage} 
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 text-white rounded-full hover:bg-cyan-500 transition-colors border border-white/10"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          type="button" 
                          onClick={nextImage} 
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 text-white rounded-full hover:bg-cyan-500 transition-colors border border-white/10"
                        >
                          <ChevronRight size={20} />
                        </button>
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/5">
                          {project.images.map((_, index) => (
                            <div 
                              key={index} 
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                index === currentImageIndex ? 'bg-cyan-400 w-3' : 'bg-white/30'
                              }`} 
                            />
                          ))}
                        </div>
                     </>
                   )}
                 </>
               ) : (
                 <div className="flex items-center justify-center h-full text-gray-600">No Images Available</div>
               )}
            </div>

            {/* 2. PROBLEM & SOLUTION */}
            <div className="grid grid-cols-1 gap-10">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }}
                 className="space-y-4"
               >
                  <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    <span className="text-cyan-400 font-mono">01.</span> The Problem
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-base glow-card p-6 border border-white/5">
                    {project.problem}
                  </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }}
                 className="space-y-4"
               >
                  <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    <span className="text-cyan-400 font-mono">02.</span> The Solution
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-base glow-card p-6 border border-white/5">
                    {project.solution}
                  </p>
               </motion.div>
            </div>

            {/* 3. KEY FEATURES */}
            {project.features && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <ListChecks className="text-purple-400" /> Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="glow-card flex items-start gap-3 p-5"
                    >
                      <CheckCircle2 size={18} className="text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. KEY LEARNINGS */}
            {project.learnings && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Lightbulb className="text-yellow-400" /> Key Learnings
                </h3>
                <div className="space-y-4">
                  {project.learnings.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="glow-card p-6 border-l-4 border-l-yellow-500/50 rounded-l-none"
                    >
                      <p className="text-gray-300 italic text-sm">"{item}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tech Stack Widget */}
            <div className="p-6.5 rounded-2xl glow-card">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <Layers size={18} className="text-cyan-400" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 text-xs font-semibold bg-neutral-950/80 border border-white/5 rounded-lg text-gray-300 hover:text-cyan-400 hover:border-cyan-500/20 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements Widget */}
            {project.achievements && (
              <div className="p-6.5 rounded-2xl glow-card">
                 <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Trophy size={18} className="text-orange-400" /> Achievements
                </h3>
                <ul className="space-y-4">
                  {project.achievements.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-xs leading-relaxed text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources Widget */}
            <div className="p-6.5 rounded-2xl glow-card">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <Code2 size={18} className="text-blue-400" /> Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href={project.repoLink} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-gray-400 hover:text-cyan-400 transition-colors group text-sm"
                  >
                    <span>GitHub Repository</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                  </a>
                </li>
                {project.liveLink !== "#" && (
                  <li>
                    <a 
                      href={project.liveLink} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between text-gray-400 hover:text-cyan-400 transition-colors group text-sm"
                    >
                      <span>Live Deployment</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                    </a>
                  </li>
                )}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {isLightboxOpen && project.images && project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 p-4 md:p-8 flex flex-col justify-center items-center"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/60 px-5 py-2.5 text-xs font-bold text-white hover:bg-white hover:text-black transition-colors"
            >
              Close Viewer
            </button>

            <div className="relative w-full h-[80vh] max-w-5xl flex items-center justify-center">
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} fullscreen screenshot`}
                fill
                className="object-contain"
                sizes="100vw"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/5 hover:bg-cyan-500 border border-white/10 p-3 text-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/5 hover:bg-cyan-500 border border-white/10 p-3 text-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 border border-white/5 px-4 py-1.5 text-xs font-semibold text-gray-300">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}