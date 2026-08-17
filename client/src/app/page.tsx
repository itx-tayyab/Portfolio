"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, Github, Linkedin, Mail, Smartphone, Globe, 
  Database, Layers, MessageSquare, Download, Cpu, Terminal
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const techStackBadges = [
    { name: "Next.js", icon: <Layers size={18} /> },
    { name: "Node.js", icon: <Cpu size={18} /> },
    { name: "NestJS", icon: <Terminal size={18} /> },
    { name: "Flutter", icon: <Smartphone size={18} /> },
    { name: "PostgreSQL", icon: <Database size={18} /> },
    { name: "Shadcn UI", icon: <Globe size={18} /> }
  ];

  return (
    <div className="min-h-screen mesh-gradient-bg text-white font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Content */}
          <motion.div 
            className="flex-1 space-y-6 lg:max-w-2xl text-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Pulsing Availability Badge */}
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center px-4.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-semibold tracking-wide"
            >
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 pulse-glow-dot"></span>
              </span>
              Available for Freelance & Full-time
            </motion.div>
            
            {/* Hero Heading */}
            <motion.h1 
              variants={fadeInUp} 
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white"
            >
              Building digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                experiences
              </span> that matter.
            </motion.h1>
            
            {/* Hero Intro */}
            <motion.p 
              variants={fadeInUp} 
              className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              I bridge the gap between complex backend logic and pixel-perfect UI. Specializing in Node.js architectures, Next.js interfaces, and Cross-platform Flutter apps.
            </motion.p>
            
            {/* Stats Row */}
            <motion.div 
              variants={fadeInUp} 
              className="grid grid-cols-3 gap-4 py-6 border-t border-white/5 max-w-md"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">3+</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Years Coding</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">10+</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Projects Built</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">12+</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Tools Mastered</p>
              </div>
            </motion.div>
            
            {/* Buttons and Social Links */}
            <motion.div 
              variants={fadeInUp} 
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link 
                href="/projects" 
                className="px-7 py-3 bg-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 text-black hover:text-white font-bold rounded-full transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-cyan-400/20 hover:scale-105"
              >
                View Work <ArrowRight size={16} />
              </Link>
              
              <a
                href="/images/tayyab.pdf"
                download="tayyab.pdf"
                className="px-7 py-3 bg-transparent border border-white/10 text-white hover:bg-white/5 font-bold rounded-full transition-all duration-300 flex items-center gap-2"
              >
                Download CV <Download size={16} />
              </a>
              
              <div className="flex items-center gap-3 px-2">
                <a 
                  href="https://github.com/itx-tayyab" 
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 transition-colors border border-white/5"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" 
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 transition-colors border border-white/5"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column: Headshot Blended (Asymmetric & Bleeding) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group">
              {/* Radial glow background behind photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />
              
              {/* Image box: asymmetric border-radius, soft rotation on hover, duotone blend */}
              <div className="w-full h-full rounded-[2.5rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] overflow-hidden border border-white/10 shadow-2xl relative transition-all duration-700 group-hover:rotate-1 group-hover:scale-[1.01] bg-neutral-900">
                <Image
                  src="/images/Tayyab.jpg"
                  alt="Tayyab Tariq Headshot"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Duotone tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-purple-500/15 mix-blend-color pointer-events-none" />
                {/* Lower gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TECH STACK BADGES SECTION --- */}
      <section className="py-12 border-y border-white/5 bg-neutral-950/20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 blur-xl opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap justify-center gap-4">
            {techStackBadges.map((tech) => (
              <div 
                key={tech.name} 
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 hover:-translate-y-1 group cursor-default"
              >
                <div className="p-1.5 rounded-lg bg-white/5 text-gray-400 group-hover:text-cyan-400 transition-colors">
                  {tech.icon}
                </div>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECT SPOTLIGHT --- */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-bold tracking-widest text-xs uppercase block"
          >
            Featured Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tight"
          >
            Highlighted Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-xl mx-auto text-base"
          >
            A few projects that reflect my ability to build scalable, efficient, and user-focused digital solutions
          </motion.p>
        </div>

        {/* Featured Showcase Card (glow-card styled container) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glow-card p-6 md:p-10 lg:p-12 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Side: 5 Columns */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-cyan-300">NestJS</span>
                <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-purple-300">Next.js</span>
                <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-blue-300">Socket.io</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">Streamlining Team Efficiency</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Designed with a microservices-ready architecture using NestJS to handle high concurrency. It features an AI Meeting Assistant that transcribes conversations and automatically assigns tasks.
              </p>
              <div>
                <Link 
                  href="/projects/harmoni" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors group"
                >
                  View Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Mockup Side: 7 Columns */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative group w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/80 transition-all duration-500 hover:scale-[1.005]">
                {/* Browser Mockup Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/60 border-b border-white/5">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="px-3 py-0.5 rounded bg-neutral-950/80 border border-white/5 text-[9px] text-gray-500 font-mono w-40 text-center truncate">
                    harmoni.app/dashboard
                  </div>
                  <div className="w-12" />
                </div>
                
                {/* Screen Image Content with Reflection */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <Image 
                    src="/images/Harmonihome.png"
                    alt="Harmoni Dashboard Mockup"
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                    priority
                  />
                  {/* Glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/8 pointer-events-none mix-blend-overlay" />
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* Scalability Callout for Projects */}
        <div className="text-center mt-12">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <span>Explore all projects built by Tayyab</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* --- "TURNING VISION INTO REALITY" SECTION --- */}
      <section className="py-24 bg-neutral-950/30 border-y border-white/5 relative">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Typography & Text Statement */}
            <div className="space-y-6 text-left">
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white">
                Turning vision into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                  reality
                </span> through code.
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Beyond the code, I’m focused on engineering reliable systems and crafting user experiences that feel seamless. From backend architecture to frontend polish, I aim to build products that are efficient, secure, and easy to use.
              </p>
              <div className="pt-2">
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white hover:bg-white hover:text-black font-semibold text-sm transition-all duration-300"
                >
                  Read My Journey
                </Link>
              </div>
            </div>

            {/* Right Column: Code Editor Mockup as Visual Anchor */}
            <div className="relative">
              <div className="relative glass-card border border-white/10 rounded-2xl p-6 font-mono text-xs overflow-hidden shadow-2xl">
                {/* Editor Header */}
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] text-gray-500 ml-2">architecture.service.ts</span>
                </div>
                {/* Editor Code Lines */}
                <div className="space-y-1.5 text-[11px] text-gray-400 overflow-x-auto">
                  <p><span className="text-cyan-400">import</span> &#123; Injectable &#125; <span className="text-cyan-400">from</span> <span className="text-purple-400">'@nestjs/common'</span>;</p>
                  <p><span className="text-cyan-400">import</span> &#123; PrismaService &#125; <span className="text-cyan-400">from</span> <span className="text-purple-400">'./prisma'</span>;</p>
                  <p>&nbsp;</p>
                  <p><span className="text-yellow-400">@Injectable</span>()</p>
                  <p><span className="text-cyan-400">export class</span> <span className="text-blue-400">SystemArchitecture</span> &#123;</p>
                  <p>&nbsp;&nbsp;<span className="text-cyan-400">constructor</span>(<span className="text-cyan-400">private</span> db: PrismaService) &#123;&#125;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;&nbsp;<span className="text-cyan-400">async</span> <span className="text-blue-400">scaleSystem</span>(load: number) &#123;</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">const</span> status = <span className="text-cyan-400">await</span> <span className="text-cyan-400">this</span>.db.nodes.deploy();</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">return</span> status.healthy ? <span className="text-green-400">'scale_ok'</span> : <span className="text-red-400">'error'</span>;</p>
                  <p>&nbsp;&nbsp;&#125;</p>
                  <p>&#125;</p>
                </div>
                {/* Ambient glow decoration */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES BENTO GRID --- */}
      <section id="services" className="py-24 max-w-6xl mx-auto px-6 scroll-mt-24">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Services I Offer</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">Expert in building modern, high-performance applications.</p>
        </div>

        {/* Bento Box Grid Setup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Web Development (Col span 2) */}
          <div className="glow-card p-8 md:p-10 flex flex-col justify-between group md:col-span-2">
            <div>
              <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-300">
                <Globe size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                I create responsive, SEO-optimized web applications with Next.js and React, focused on speed, accessibility, and modern design standards.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-gray-500 group-hover:text-cyan-400 transition-colors">
              <span>Next.js • React • TypeScript</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Card 2: Mobile Development (Col span 1) */}
          <div className="glow-card p-8 md:p-10 flex flex-col justify-between group md:col-span-1">
            <div>
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-300">
                <Smartphone size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mobile Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I build high-performance cross-platform mobile apps using Flutter, delivering smooth 60fps experiences, clean UI, and intuitive user journeys.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-gray-500 group-hover:text-blue-400 transition-colors">
              <span>Flutter • Dart • Provider</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Card 3: Backend Integration (Col span 1) */}
          <div className="glow-card p-8 md:p-10 flex flex-col justify-between group md:col-span-1">
            <div>
              <div className="w-14 h-14 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-110 transition-transform duration-300">
                <Database size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Backend Integration</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I develop and integrate secure, scalable backend systems using Node.js, NestJS, and PostgreSQL, with a strong emphasis on API security and performance.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-gray-500 group-hover:text-purple-400 transition-colors">
              <span>NestJS • Node.js • PostgreSQL</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Card 4: Full Stack Solutions (Col span 2) */}
          <div className="glow-card p-8 md:p-10 flex flex-col justify-between group md:col-span-2">
            <div>
              <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform duration-300">
                <Layers size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Full-Stack Solutions</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                From UI/UX design to database architecture, I manage the complete product lifecycle, delivering end-to-end, production-ready solutions.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-semibold text-gray-500 group-hover:text-emerald-400 transition-colors">
              <span>Next.js • NestJS • WebSockets</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="glow-card p-10 md:p-20 text-center relative overflow-hidden rounded-[2rem]">
          {/* Internal ambient radial glow circles */}
          <div className="absolute -top-12 -left-12 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Whether you need a complex backend architecture, a stunning frontend, or a full-stack solution, I am ready to help you bring your vision to life.
          </p>
          <div className="relative z-10">
             <Link 
               href="/contact" 
               className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:scale-105"
             >
               Start a Conversation <MessageSquare size={20} />
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}