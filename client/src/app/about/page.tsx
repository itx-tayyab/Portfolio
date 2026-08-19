"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Linkedin, Mail, GraduationCap, Cpu, Calendar, Terminal, 
  Layout, Smartphone, Database, GitBranch, ShieldAlert, Sparkles, Flame
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function About() {
  return (
    <div className="min-h-screen mesh-gradient-bg text-white font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* 1. HERO BIO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Text (Asymmetric overlap) */}
          <motion.div 
            className="lg:col-span-7 space-y-8 text-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-cyan-400 font-bold tracking-widest text-xs uppercase block">
              Biography
            </motion.span>
            
            <motion.h1 
              variants={fadeInUp} 
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white"
            >
              Driven by Logic, <br />
              Inspired by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Innovation.
              </span>
            </motion.h1>
            
            {/* Primary Intro Paragraph (larger font) */}
            <motion.p 
              variants={fadeInUp} 
              className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium"
            >
              I am a Full Stack developer with a passion for building complex, scalable systems. My journey is defined by a curiosity for how things work under the hood.
            </motion.p>
            
            {/* Secondary paragraphs (smaller, muted slate gray) */}
            <motion.div 
              variants={fadeInUp} 
              className="space-y-4 text-sm md:text-base text-gray-400 leading-relaxed"
            >
              <p>
                Hello! I'm <strong className="text-white font-semibold">Tayyab Tariq</strong>. My interest in Full stack development started not just with writing code, but with the desire to solve real-world problems.
              </p>
              <p>
                While I have extensive experience in frontend technologies like Next.js and Flutter, my true passion lies in Backend Architecture. I enjoy designing databases, optimizing API response times using NestJS, and ensuring security in digital ecosystems.
              </p>
              <p>
                I don't just write code; I engineer solutions. Whether it's a cross-platform mobile app or a complex collaboration tool, I prioritize scalability, maintainability, and user experience.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Right Column: Headshot Cutout with Cyan/Purple Rim Lighting */}
          {/* Right Column: Blended Headshot with Glowing Backdrop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full flex justify-center lg:justify-end items-center min-h-[400px]"
          >
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] aspect-square flex items-end justify-center group">
              
              {/* 1. Abstract Glowing Background Elements (Behind the image) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Core ambient glows */}
                <div className="absolute w-[80%] h-[80%] rounded-full bg-cyan-500/20 blur-[80px] group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute w-[50%] h-[50%] rounded-full bg-purple-600/30 blur-[60px] group-hover:bg-purple-600/40 group-hover:scale-110 transition-all duration-700" />
                
                {/* Tech rings (like the reference image) */}
                <div className="absolute w-[90%] h-[90%] rounded-full border border-cyan-500/10 border-dashed animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-[110%] h-[110%] rounded-full border border-purple-500/10 opacity-50" />
              </div>

              {/* 2. The Image with Bottom Fade (CSS Mask) */}
              <div 
                className="relative w-full h-[120%] z-10 bottom-0"
                style={{
                  // This is the magic that fades the bottom of the image smoothly into the background
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
                }}
              >
                <Image
                  // Make sure to use your new background-removed PNG here!
                  src="/images/Tayyab-transparent.png" 
                  alt="Tayyab Tariq"
                  fill
                  className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <section className="py-8 border-y border-white/5 bg-neutral-950/20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
            {/* Stat Card 1 */}
            <div className="glow-card py-4 px-6 flex flex-col justify-center items-center">
              <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">3+</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Years Coding</p>
            </div>
            
            {/* Stat Card 2 */}
            <div className="glow-card py-4 px-6 flex flex-col justify-center items-center">
              <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">10+</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Projects Built</p>
            </div>
            
            {/* Stat Card 3 */}
            <div className="glow-card py-4 px-6 flex flex-col justify-center items-center">
              <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">12+</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Tools Mastered</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDUCATION TIMELINE SECTION */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase block">Timeline</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Academic Journey</h2>
        </div>

        {/* Chronological connected-node graphic timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Horizontal connecting line (Desktop only) */}
          <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 z-0" />
          
          {/* Vertical connecting line (Mobile only) */}
          <div className="md:hidden absolute top-0 bottom-0 left-[22px] w-[2px] bg-gradient-to-b from-cyan-500/20 to-purple-500/20 z-0" />

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 relative z-10">
            
            {/* Timeline Node 1 (Govt Islamia College) */}
            <div className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 md:w-[45%] text-left md:text-center relative">
              {/* Dot Icon */}
              <div className="w-11 h-11 rounded-full bg-neutral-900 border-2 border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 md:mb-2 shadow-[0_0_15px_rgba(168,85,247,0.15)] z-20 bg-[#030303]">
                <Calendar size={16} />
              </div>
              
              <div className="glow-card p-6 flex-grow w-full">
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/5 border border-purple-500/20 px-3 py-1 rounded-full">
                  2020 - 2022
                </span>
                <h4 className="text-lg font-bold text-white mt-4">Intermediate in CS</h4>
                <p className="text-sm text-cyan-400 font-semibold mt-1">Govt Islamia College</p>
                <p className="text-xs text-gray-500 mt-1">Civil Lines • Lahore</p>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  Laid the foundation of computer science, covering basic logic, algorithms, databases, and structured programming paradigms.
                </p>
              </div>
            </div>

            {/* Spacer for layout rhythm */}
            <div className="hidden md:block w-[10%]" />

            {/* Timeline Node 2 (Superior University) */}
            <div className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 md:w-[45%] text-left md:text-center relative">
              {/* Dot Icon */}
              <div className="w-11 h-11 rounded-full bg-neutral-900 border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 md:mb-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] z-20 bg-[#030303]">
                <GraduationCap size={16} />
              </div>
              
              <div className="glow-card p-6 flex-grow w-full">
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/5 border border-cyan-500/20 px-3 py-1 rounded-full">
                  2022 - 2026
                </span>
                <h4 className="text-lg font-bold text-white mt-4">BS Computer Science</h4>
                <p className="text-sm text-cyan-400 font-semibold mt-1">Superior University</p>
                <p className="text-xs text-gray-500 mt-1">Lahore</p>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  Specialized in advanced database systems, data structures, algorithms, network architecture, and full-stack software development methodologies.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. "WHAT DRIVES ME" SECTION */}
      <section className="py-24 bg-neutral-950/20 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 blur-xl opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-3">
            <span className="text-purple-400 font-bold tracking-widest text-xs uppercase block">Core Values</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">What Drives Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="glow-card p-6 text-center group">
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 border border-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Terminal size={22} />
              </div>
              <h4 className="font-bold text-white mb-2 text-base">Backend Architecture</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Structuring complex backend data flows. Node.js & NestJS are my tools of choice for creating reliable, low-latency APIs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glow-card p-6 text-center group">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 border border-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Layout size={22} />
              </div>
              <h4 className="font-bold text-white mb-2 text-base">Clean Interfaces</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                A strong architecture needs an equally polished interface. I build responsive designs with React, Tailwind, and Shadcn.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glow-card p-6 text-center group">
              <div className="w-12 h-12 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 border border-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Flame size={22} />
              </div>
              <h4 className="font-bold text-white mb-2 text-base">Problem Solving</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                I enjoy engineering solutions for complex real-world use cases, ensuring security, performance, and future scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL EXPERTISE SECTION */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase block">Skills</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Technical Expertise</h2>
        </div>

        {/* Balanced 3-column Grid (Layout with grid-cols-6: rows of 3 components and 2 components) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Backend (Col span 2) */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-2">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 border border-cyan-500/10 text-cyan-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Terminal size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">Backend Engineering</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Building robust, scalable APIs and microservices architectures.
               </p>
             </div>
             
             {/* Micro-tags instead of bullet points */}
             <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-6">
               {["Node.js", "Express", "NestJS", "Socket.io", "REST APIs"].map((tech) => (
                 <span key={tech} className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/5 border border-white/5 rounded-full text-gray-300 hover:border-cyan-400 hover:text-white transition-colors duration-200">
                   {tech}
                 </span>
               ))}
             </div>
          </div>

          {/* Card 2: Frontend (Col span 2) */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-2">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 border border-purple-500/10 text-purple-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layout size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">Modern Frontend</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Creating responsive, accessible, and attractive web interfaces.
               </p>
             </div>
             
             {/* Micro-tags */}
             <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-6">
               {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
                 <span key={tech} className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/5 border border-white/5 rounded-full text-gray-300 hover:border-purple-400 hover:text-white transition-colors duration-200">
                   {tech}
                 </span>
               ))}
             </div>
          </div>

          {/* Card 3: App Dev (Col span 2) */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-2">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 border border-blue-500/10 text-blue-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">App Development</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Extending functionality to mobile devices with native performance.
               </p>
             </div>
             
             {/* Micro-tags */}
             <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-6">
               {["Flutter", "Dart", "Provider", "Mobile UI/UX"].map((tech) => (
                 <span key={tech} className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/5 border border-white/5 rounded-full text-gray-300 hover:border-blue-400 hover:text-white transition-colors duration-200">
                   {tech}
                 </span>
               ))}
             </div>
          </div>

          {/* Card 4: Database (Col span 3) */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-3">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 border border-emerald-500/10 text-emerald-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">Database Architecture</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Designing efficient schemas and optimizing query performance.
               </p>
             </div>
             
             {/* Micro-tags */}
             <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-6">
               {["MySQL", "PostgreSQL", "MongoDB", "Redis Caching", "Prisma ORM"].map((tech) => (
                 <span key={tech} className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/5 border border-white/5 rounded-full text-gray-300 hover:border-emerald-400 hover:text-white transition-colors duration-200">
                   {tech}
                 </span>
               ))}
             </div>
          </div>

          {/* Card 5: DevOps (Col span 3) */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-3">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-orange-500/10 to-red-500/10 border border-orange-500/10 text-orange-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GitBranch size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">DevOps & Tools</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Ensuring smooth deployment and code management workflows.
               </p>
             </div>
             
             {/* Micro-tags */}
             <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-6">
               {["Git & GitHub", "Docker", "Containers", "Postman", "CI/CD"].map((tech) => (
                 <span key={tech} className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/5 border border-white/5 rounded-full text-gray-300 hover:border-orange-400 hover:text-white transition-colors duration-200">
                   {tech}
                 </span>
               ))}
             </div>
          </div>

        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="glow-card p-10 md:p-16 text-center relative overflow-hidden rounded-[2rem] max-w-4xl mx-auto">
          {/* Internal ambient radial glow circles */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight tracking-tight">
            Let's Build Something Together.
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
            I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          {/* Frosted glass pill-shaped magnetic buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="mailto:tayyabtariq838@gmail.com" 
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 hover:border-cyan-500/40 text-white font-bold text-sm rounded-full flex items-center justify-center gap-3 shadow-lg shadow-black/30 hover:scale-105 transition-all duration-300"
            >
              <Mail size={16} className="text-cyan-300" />
              <span>Email Me</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 hover:border-purple-500/40 text-white font-bold text-sm rounded-full flex items-center justify-center gap-3 shadow-lg shadow-black/30 hover:scale-105 transition-all duration-300"
            >
              <Linkedin size={16} className="text-purple-300" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}