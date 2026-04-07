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
// Update this with your real data and image paths
const projectsDB = {
  "harmoni": {
    title: "Harmoni",
    tagline: "All-in-one Collaboration Tool",
    status: "In Progress",
    date: "Dec 2024",
    repoLink: "https://github.com/yourusername/harmoni",
    liveLink: "https://harmoni.app",
    gradient: "from-indigo-900 to-cyan-900",
    
    // CAROUSEL IMAGES (Put images in /public/images/...)
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
    gradient: "from-slate-800 to-gray-900",
    
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
    gradient: "from-emerald-900 to-green-900",
    
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
    gradient: "from-emerald-900 to-green-900",
    
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
      "Cient invitation and onboarding flows",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ProjectDetails() {
  const params = useParams();
  const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;
  const project = projectsDB[projectId as keyof typeof projectsDB];
  
  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback if project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-cyan-400 hover:underline">Back to Projects</Link>
      </div>
    );
  }

  // Carousel Handlers
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
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Tayyab Tariq
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/projects" className="text-cyan-400 transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
          <Link href="/contact" className="px-4 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-cyan-400 transition-all">
            Let's Talk
          </Link>
        </div>
      </nav>

      {/* --- HERO HEADER --- */}
      <section className={`relative pt-40 pb-20 px-6 bg-gradient-to-b ${project.gradient} to-neutral-950 border-b border-white/10`}>
        <div className="max-w-5xl mx-auto">
          <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${
                project.status === "Completed" 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-orange-500/10 text-orange-400 border-orange-500/20"
              }`}>
                {project.status === "Completed" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                {project.status}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Calendar size={14} /> {project.date}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{project.tagline}</p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href={project.repoLink} target="_blank" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-all flex items-center gap-2">
                <Github size={20} /> View Code
              </a>
              {project.liveLink !== "#" && (
                <a href={project.liveLink} target="_blank" className="px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all flex items-center gap-2">
                  <ExternalLink size={20} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* 1. IMAGE CAROUSEL */}
            <div className="relative w-full aspect-video bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden group">
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
                   
                   {/* Carousel Controls (Only if > 1 image) */}
                   {project.images.length > 1 && (
                     <>
                        <button type="button" onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-cyan-500 transition-all">
                          <ChevronLeft size={24} />
                        </button>
                        <button type="button" onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-cyan-500 transition-all">
                          <ChevronRight size={24} />
                        </button>
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {project.images.map((_, index) => (
                            <div key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-cyan-400' : 'bg-white/30'}`} />
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
            <div className="grid grid-cols-1 gap-12">
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                    <span className="text-cyan-400">01.</span> The Problem
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-lg bg-neutral-900/50 p-6 rounded-xl border border-white/5">
                    {project.problem}
                  </p>
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                    <span className="text-cyan-400">02.</span> The Solution
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-lg bg-neutral-900/50 p-6 rounded-xl border border-white/5">
                    {project.solution}
                  </p>
               </motion.div>
            </div>

            {/* 3. KEY FEATURES */}
            {project.features && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <ListChecks className="text-purple-400" /> Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900 border border-white/10 hover:border-purple-500/30 transition-colors">
                      <CheckCircle2 size={20} className="text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. KEY LEARNINGS */}
            {project.learnings && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <Lightbulb className="text-yellow-400" /> Key Learnings
                </h3>
                <div className="space-y-4">
                  {project.learnings.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-900/50 border-l-4 border-yellow-500/50">
                      <p className="text-gray-300 italic">"{item}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tech Stack Widget */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-cyan-400" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-2 text-sm bg-neutral-950 border border-white/10 rounded-md text-gray-300 hover:text-cyan-400 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements Widget */}
            {project.achievements && (
              <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10">
                 <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                  <Trophy size={20} className="text-orange-400" /> Achievements
                </h3>
                <ul className="space-y-4">
                  {project.achievements.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources Widget */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-blue-400" /> Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href={project.repoLink} className="flex items-center justify-between text-gray-400 hover:text-cyan-400 transition-colors group">
                    <span className="text-sm">GitHub Repository</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </a>
                </li>
                {project.liveLink !== "#" && (
                  <li>
                    <a href={project.liveLink} className="flex items-center justify-between text-gray-400 hover:text-cyan-400 transition-colors group">
                      <span className="text-sm">Live Deployment</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </a>
                  </li>
                )}
              </ul>
            </div>

          </div>

        </div>
      </section>

      <AnimatePresence>
        {isLightboxOpen && project.images && project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 p-4 md:p-8"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white hover:bg-black/80"
            >
              Close
            </button>

            <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center">
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-cyan-500"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-cyan-500"
                    aria-label="Next image"
                  >
                    <ChevronRight size={28} />
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
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