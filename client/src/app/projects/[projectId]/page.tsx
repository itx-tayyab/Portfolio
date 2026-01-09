"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Github, Linkedin, ExternalLink, Calendar, Layers, CheckCircle2, AlertCircle, Code2, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- MOCK DATA (In a real app, this would come from a database) ---
const projectsDB = {
  "harmoni": {
    title: "Harmoni",
    tagline: "All-in-one Collaboration Tool",
    status: "In Progress",
    date: "Dec 2024",
    repoLink: "https://github.com/yourusername/harmoni",
    liveLink: "https://harmoni.app",
    problem: "Remote teams often struggle with fragmentation. They use Slack for messaging, Trello for tasks, and Google Drive for files. Switching between these apps kills productivity and breaks flow.",
    solution: "Harmoni unifies these three pillars into a single interface. I architected a Microservices-ready backend using NestJS to handle real-time WebSocket connections for messaging while simultaneously managing relational data for tasks in PostgreSQL. The frontend uses Next.js for SEO and speed.",
    techStack: ["NestJS", "Next.js", "Socket.io", "PostgreSQL", "Redis", "Shadcn UI"],
    gradient: "from-indigo-900 to-cyan-900"
  },
  "covid19-tracker-app": {
    title: "Covid19 Tracker App",
    tagline: "ERP & CRM for Modern ",
    status: "Completed",
    date: "July 2025",
    repoLink: "https://github.com/itx-tayyab/covid19_tracker_app_with_api",
    liveLink: "#",
    problem: "When the virus spread scientist gatherered the data of all infected persons and uploaded them online on the basis of country and it's cities. ",
    solution: "The some persons who don't know how to check data online so for that we have make this app so every use it in easy way without facing any issues.",
    techStack: ["Flutter", "Mvvm Architecture", "Provider", "Rest API"],
    gradient: "from-slate-800 to-gray-900"
  },
  "weather-app": {
    title: "Weather App",
    tagline: "Smart Farming for Healthy Crops",
    status: "Completed",
    date: "August 2025",
    repoLink: "https://github.com/itx-tayyab/weather_app",
    liveLink: "#",
    problem: "Accessing real-time weather data often requires multiple platforms and complex interfaces.",
    solution: "Developed a cross-platform Flutter app integrated with a weather API to provide fast, accurate weather updates in a user-friendly design.",
    techStack: ["Flutter", "MVVM Architecture", "Provider", "OpenWeather API"],
    gradient: "from-emerald-900 to-green-900"
  }
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6} }
};

export default function ProjectDetails() {
  const params = useParams();
  const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;
  const project = projectsDB[projectId as keyof typeof projectsDB];

  // Fallback if project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-cyan-400 hover:underline">Back to Projects</Link>
      </div>
    );
  }

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
              {/* Status Badge */}
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

            {/* Action Buttons */}
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
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          
          {/* LEFT COLUMN (Problem & Solution) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Project Image Placeholder */}
            <div className="w-full aspect-video bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
               <span className="text-gray-600 font-mono">Project Screenshot / Demo Video</span>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
              The Problem
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {project.problem}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                The Solution
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {project.solution}
              </p>
            </motion.div>

          </div>

          {/* RIGHT COLUMN (Tech Stack & Meta) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tech Stack Widget */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-cyan-400" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="px-3 py-2 text-sm bg-neutral-950 border border-white/10 rounded-md text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links Widget */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-purple-400" /> Resources
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

      {/* --- FOOTER (Exact Match) --- */}
      <footer className="bg-neutral-950 pt-20 pb-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-6 space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Tayyab Tariq</h3>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                I build practical, user-focused solutions that balance performance, usability, and scalability. My goal is to create products that are not only functional, but genuinely valuable.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://github.com/itx-tayyab" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/tayyab-tariq-a51379260" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all"><Linkedin size={20} /></a>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
               <h4 className="text-sm font-bold tracking-wider text-gray-500 uppercase">Sitemap</h4>
               <ul className="space-y-4 text-gray-300 font-medium">
                 <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                 <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link></li>
                 <li><Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link></li>
                 <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
                 <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
               </ul>
            </div>
            <div className="md:col-span-4 space-y-6">
               <h4 className="text-sm font-bold tracking-wider text-gray-500 uppercase">Get in touch</h4>
               <p className="text-gray-400">
                 Have a project in mind? I’m always open to exploring opportunities that challenge me to create high-quality, scalable solutions.
               </p>
               <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0091d0] hover:bg-[#007bb0] text-white font-bold rounded-full transition-all shadow-lg hover:shadow-cyan-500/25">
                 Start a Conversation <ArrowUpRight size={20} />
               </Link>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center md:text-left">
            <p className="text-gray-600 text-center text-sm">
              &copy; 2025 Tayyab Tariq. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}