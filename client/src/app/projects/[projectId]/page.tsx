"use client";
import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Github, ExternalLink, Calendar, Layers, 
  CheckCircle2, AlertCircle, Code2, ArrowRight, Sparkles,
  Award, RefreshCw, Layout, Terminal, Heart, ArrowUpRight
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
    role: "Lead Full-Stack Architect",
    category: "Full Stack",
    
    images: [
      "/images/harmonidashboard.png",
      "/images/harmoniteam.png",
      "/images/harmoniteampage.png",
      "/images/harmoniteamembers.png",
    ],
    
    problem: "Remote teams often struggle with fragmentation. They use Slack for messaging, Trello for tasks, and Google Drive for files. Switching between these apps kills productivity and breaks flow.",
    solution: "Harmoni unifies these three pillars into a single interface. I architected a Microservices-ready backend using NestJS to handle real-time WebSocket connections for messaging while simultaneously managing relational data for tasks in PostgreSQL.",
    
    features: [
      {
        title: "Real-time Messaging with Socket.io",
        desc: "A low-latency chat interface with read receipts, typing indicators, and support for group channels."
      },
      {
        title: "Drag-and-Drop Task Kanban Board",
        desc: "Interactive project boards where teams can plan, organize, and transition tasks across columns using clean, animated drag handlers."
      },
      {
        title: "Secure File Sharing & Preview",
        desc: "Encrypted document storage with instant media previews and file metadata rendering built directly into the conversation feeds."
      },
      {
        title: "AI Meeting Assistant & Summarizer",
        desc: "An intelligence layer that transcribes discussions, extracts key action items, and generates automatic meeting summaries."
      },
      {
        title: "Role-based Access Control (RBAC)",
        desc: "Granular authorization mechanisms protecting sensitive data pipelines and ensuring secure multi-tenant workspace isolation."
      }
    ],
    
    techStack: ["NestJS", "Next.js", "Socket.io", "PostgreSQL", "Redis", "Shadcn UI"],
    
    learnings: [
      "Mastered Microservices communication patterns (TCP/Redis) for high scalability.",
      "Optimized WebSocket performance for 1000+ concurrent users with Redis adapters.",
      "Implemented complex state management for real-time updates and optimistic UI updates."
    ],
    
    achievements: [
      { stat: "40%", sub: "Reduction in context-switching time" },
      { stat: "AWS", sub: "Docker Swarm deployment orchestrations" }
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
    role: "Flutter Developer",
    category: "Mobile",
    
    images: [
      "/images/covid-main.png",
      "/images/covid-stats.png"
    ],
 
    problem: "During the pandemic, accessing consolidated, real-time data on infection rates across specific cities and countries was difficult for the general public.",
    solution: "We built a mobile app that aggregates data from global APIs and presents it in an easy-to-read dashboard, allowing users to filter by country and city.",
    
    features: [
      {
        title: "Global & Country-wise Statistics",
        desc: "Combines raw API reports into structured widgets detailing total cases, recoveries, and deaths worldwide."
      },
      {
        title: "Visual Graphs for Active/Recovered Cases",
        desc: "Clean time-series charts visualizing case trends and progression patterns over time."
      },
      {
        title: "Search Functionality by Country",
        desc: "A highly-responsive search utility enabling users to query specific national stats instantly."
      },
      {
        title: "Offline Data Caching",
        desc: "Saves state locally to ensure continuous access to critical records even without network coverage."
      }
    ],
 
    techStack: ["Flutter", "MVVM Architecture", "Provider", "Rest API"],
    
    learnings: [
      "Parsed complex nested JSON data streams in Dart.",
      "Implemented clean MVVM patterns for UI and business logic separation.",
      "Handled API errors and network timeouts gracefully with custom error states."
    ],
 
    achievements: [
      { stat: "99.9%", sub: "Crash-free sessions achieved" },
      { stat: "API", sub: "Seamless data aggregation wrapper" }
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
    role: "Mobile UI Designer & Developer",
    category: "Mobile",
    
    images: [
      "/images/weather-home.png"
    ],
 
    problem: "Accessing real-time weather data often requires multiple platforms and complex interfaces.",
    solution: "Developed a cross-platform Flutter app integrated with a weather API to provide fast, accurate weather updates in a user-friendly design.",
    
    features: [
      {
        title: "Geolocation-based Weather Detection",
        desc: "Accurately detects user coordinates to display local forecast data immediately on startup."
      },
      {
        title: "7-Day Forecast",
        desc: "Detailed future climate expectations including humidity, wind speeds, and temperature fluctuations."
      },
      {
        title: "Dynamic Backgrounds based on Weather",
        desc: "Adapts the visual theme of the UI to reflect active atmospheric conditions like rain, snow, or sunshine."
      },
      {
        title: "Search any City",
        desc: "A autocomplete city query engine linking to global coordinates and weather streams."
      }
    ],
 
    techStack: ["Flutter", "MVVM Architecture", "Provider", "OpenWeather API"],
    
    learnings: [
      "Mastered Location Services Permissions and user-consent handlers in mobile systems.",
      "Managed asynchronous data streams using Dart streams and Future Builders."
    ],
    
    achievements: [
      { stat: "Cache", sub: "Reduced API calls by implementing local caches" },
      { stat: "60fps", sub: "Smooth custom rendering animations" }
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
    role: "Lead Full-Stack Developer",
    category: "Full Stack",
    
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
      {
        title: "Real-time Messaging",
        desc: "Ensures instant messaging and updates between freelancers and clients with socket-based channel rooms."
      },
      {
        title: "Task Management System",
        desc: "Allows tracking project milestones, deliverables, and outstanding issues with structured task cards."
      },
      {
        title: "File Sharing & Version Control",
        desc: "A centralized hub to upload assets, track feedback revisions, and maintain clean delivery history."
      },
      {
        title: "Client Feedback Integration",
        desc: "Interactive sign-off widgets enabling clients to approve milestones or request changes instantly."
      }
    ],
 
    techStack: ["React", "Next.js", "Express.js", "Socket.io", "Tailwind CSS"],
    
    learnings: [
      "Designed and refined client invitation and onboarding invitation flows.",
      "Optimized real-time socket connections for high durability.",
      "Implemented secure file uploads and storage with clean signature key validations."
    ],
    
    achievements: [
      { stat: "ORM", sub: "Intricate multi-table relations in Prisma" },
      { stat: "JWT", sub: "Secure workspace isolation boundaries" }
    ]
  }
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ProjectDetails() {
  const params = useParams();
  const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;
  const project = projectsDB[projectId as keyof typeof projectsDB];
  
  // Gallery Slide State
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-black mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-cyan-400 hover:underline text-sm font-semibold">Back to Projects</Link>
      </div>
    );
  }

  // Next Project computation
  const projectKeys = Object.keys(projectsDB);
  const currentIndex = projectKeys.indexOf(projectId || "");
  const nextProjectKey = projectKeys[(currentIndex + 1) % projectKeys.length];
  const nextProject = projectsDB[nextProjectKey as keyof typeof projectsDB];

  const isMobileApp = project.category === "Mobile";

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-end px-6 py-20 overflow-hidden">
        {/* Ambient Project visual backdrop */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-10`} />
          <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px] z-10" />
          
          {/* Ambient light glow */}
          <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${project.gradient.includes("indigo") ? "from-indigo-500/10 to-cyan-500/10" : project.gradient.includes("emerald") ? "from-emerald-500/10 to-teal-500/10" : "from-purple-500/10 to-cyan-500/10"} rounded-full blur-[120px]`} />
          
          {/* Project cover preview */}
          {project.images && project.images[0] && (
            <div className="relative w-full h-full opacity-20 scale-105 filter saturate-[0.8]">
              <Image
                src={project.images[0]}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto w-full relative z-20 mt-32">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-xs font-semibold uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Projects
          </Link>
          
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Status Pulse */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${
                project.status === "Completed" 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-orange-500/10 text-orange-400 border-orange-500/20"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${project.status === "Completed" ? "bg-green-400" : "bg-orange-400 animate-pulse"}`} />
                {project.status}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={fadeInUp} 
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.95]"
            >
              {project.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p 
              variants={fadeInUp} 
              className="text-xl sm:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed"
            >
              {project.tagline}
            </motion.p>

            {/* Meta Rows (No Boxes, typographic hierarchy) */}
            <motion.div 
              variants={fadeInUp} 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10 mt-12 max-w-4xl"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Role</p>
                <p className="text-sm font-semibold text-white mt-1.5">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Timeline</p>
                <p className="text-sm font-semibold text-white mt-1.5 flex items-center gap-1.5">
                  <Calendar size={13} className="text-cyan-400" /> {project.date}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Category</p>
                <p className="text-sm font-semibold text-white mt-1.5">{project.category}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Platform</p>
                <p className="text-sm font-semibold text-white mt-1.5">{isMobileApp ? "Mobile (iOS & Android)" : "Web Application"}</p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-8">
              <a 
                href={project.repoLink} 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-3.5 bg-white text-black font-bold text-sm rounded-full hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-400/20 flex items-center gap-2"
              >
                <Github size={16} /> View Code
              </a>
              {project.liveLink !== "#" && (
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <ExternalLink size={16} className="text-cyan-400" /> Live Demo
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. OVERVIEW: PROBLEM & SOLUTION (Editorial, Magazine style layout) */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="space-y-20">
          {/* Problem */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
            <div className="md:col-span-4 flex items-baseline gap-2">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-black">01.</span>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">The Challenge</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl sm:text-3xl font-light text-gray-200 tracking-tight leading-relaxed pl-6 border-l border-cyan-500/20">
                "{project.problem}"
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
            <div className="md:col-span-4 flex items-baseline gap-2">
              <span className="text-purple-400 font-mono text-xs uppercase tracking-widest font-black">02.</span>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">The Architecture</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light pl-6 border-l border-purple-500/20">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEDIA SHOWCASE (High-Fidelity 3D Angled Mockup Frame) */}
      {project.images && project.images.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-b from-[#050505] via-neutral-900/10 to-[#050505] overflow-hidden">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            
            {/* Gallery Control Tabs */}
            <div className="flex flex-wrap gap-2.5 mb-10 justify-center">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                    idx === currentImgIndex
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Screen {idx + 1}
                </button>
              ))}
            </div>

            {/* 3D Angled Frame Container */}
            <div className="relative w-full flex justify-center py-10 scale-90 sm:scale-100">
              
              {/* Radial Backdrop Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />
              </div>

              {/* device wrapper */}
              <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                
                {isMobileApp ? (
                  /* 3D Angled iPhone mockup */
                  <div 
                    className="relative w-[280px] h-[570px] bg-[#1a1a1a] rounded-[48px] p-3 shadow-2xl border-[4px] border-[#2d2d2d] flex flex-col overflow-hidden"
                    style={{
                      transform: "perspective(1000px) rotateX(6deg) rotateY(12deg) rotateZ(-2deg)",
                      boxShadow: "-20px 20px 50px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255,255,255,0.1)"
                    }}
                  >
                    {/* Speaker Bezel */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-30 flex items-center justify-center">
                      {/* Dynamic Island */}
                      <div className="w-16 h-3 bg-[#0a0a0a] rounded-full" />
                    </div>
                    {/* Screen View */}
                    <div className="relative flex-1 bg-black rounded-[38px] overflow-hidden">
                      <Image
                        src={project.images[currentImgIndex]}
                        alt="Mobile screen visual"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  /* 3D Angled MacBook mockup */
                  <div 
                    className="relative w-[320px] sm:w-[640px] md:w-[760px] aspect-[16/10] bg-[#1f1f23] rounded-t-2xl p-1.5 shadow-2xl border border-white/10 flex flex-col overflow-hidden"
                    style={{
                      transform: "perspective(1000px) rotateX(4deg) rotateY(-8deg) rotateZ(1deg)",
                      boxShadow: "20px 20px 60px rgba(0, 0, 0, 0.9)"
                    }}
                  >
                    {/* macOS Style window controls */}
                    <div className="h-6 w-full bg-[#161619] flex items-center px-4 gap-1.5 border-b border-black/30 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    {/* Screen View */}
                    <div className="relative flex-1 bg-black overflow-hidden">
                      <Image
                        src={project.images[currentImgIndex]}
                        alt="Web screen visual"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. TECHNOLOGIES (Glowing Micro-tags in open space) */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex items-baseline gap-2">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-black">03.</span>
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">Tech Stack</h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-2xl sm:text-3xl font-black mb-8">System Architecture & Tools</h3>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-5 py-2.5 text-xs font-semibold bg-white/[0.02] border border-white/5 rounded-full text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ALTERNATING FEATURES (Visual storytelling layout) */}
      {project.features && project.features.length > 0 && (
        <section className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
          <div className="space-y-6 mb-16">
            <div className="flex items-baseline gap-2">
              <span className="text-purple-400 font-mono text-xs uppercase tracking-widest font-black">04.</span>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">Guided Walkthrough</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white">Features Breakdown</h3>
          </div>

          <div className="space-y-32">
            {project.features.map((feature, idx) => {
              // Sequentially pick mockups if available
              const hasImage = project.images && project.images.length > 0;
              const imgIndex = idx % (project.images ? project.images.length : 1);
              const imgSrc = hasImage ? project.images[imgIndex] : null;

              return (
                <div 
                  key={idx}
                  className={`flex flex-col md:flex-row gap-12 items-center ${
                    idx % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image side */}
                  <div className="w-full md:w-1/2">
                    {imgSrc ? (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 shadow-xl group">
                        <Image
                          src={imgSrc}
                          alt={feature.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#050505]/20" />
                      </div>
                    ) : (
                      <div className="w-full aspect-video bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center">
                        <Code2 size={40} className="text-cyan-500/40" />
                      </div>
                    )}
                  </div>

                  {/* Info side */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">
                      Feature 0{idx + 1}
                    </span>
                    <h4 className="text-2xl font-bold text-white tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm font-light">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. LEARNINGS & RESULTS (Editorial metrics, outcomes) */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Key Learnings */}
          <div className="md:col-span-7 space-y-8">
            <div className="flex items-baseline gap-2">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-black">05.</span>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">Key Learnings</h2>
            </div>
            
            <div className="space-y-6">
              {project.learnings.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start pl-6 border-l border-cyan-500/20">
                  <span className="text-xs font-mono text-cyan-400 mt-1">/0{idx + 1}</span>
                  <p className="text-gray-300 leading-relaxed text-base italic font-light">
                    "{item}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* High-Impact Stat Metrics */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-baseline gap-2">
              <span className="text-purple-400 font-mono text-xs uppercase tracking-widest font-black">06.</span>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">Key Metrics</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {project.achievements.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
                    {item.stat}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-mono font-bold leading-normal">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. NEXT CASE STUDY (Teaser navigator) */}
      <section className="py-20 border-t border-white/5 bg-gradient-to-b from-[#050505] to-black">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">07. NEXT CASE STUDY</span>
          
          <Link 
            href={`/projects/${nextProjectKey}`}
            className="mt-6 group block max-w-2xl"
          >
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-black text-white hover:text-cyan-400 transition-colors duration-300 tracking-tight leading-none">
              {nextProject.title}
            </h3>
            
            <p className="text-gray-400 font-light mt-4 text-base flex items-center justify-center gap-2 hover:text-white transition-colors">
              Read project narrative <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </p>
          </Link>
        </div>
      </section>

    </div>
  );
}
