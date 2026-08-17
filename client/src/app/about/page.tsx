"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Linkedin, Mail, GraduationCap, Cpu, Calendar, Terminal, 
  Layout, Smartphone, Database, GitBranch 
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

export default function About() {
  return (
    <div className="min-h-screen mesh-gradient-bg text-white font-sans selection:bg-cyan-500/30 selection:text-white">
    
      {/* --- HERO / HEADER --- */}
      <section className="relative pt-40 pb-16 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.span variants={fadeInUp} className="text-cyan-400 font-bold tracking-widest text-xs uppercase mb-4 block">
            The Story So Far
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Driven by Logic, <br /> Inspired by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold">Innovation.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I am a Full Stack developer with a passion for building complex, scalable systems. My journey is defined by a curiosity for how things work under the hood.
          </motion.p>
        </motion.div>
      </section>

      {/* --- MAIN BIOGRAPHY & EDUCATION SECTION --- */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Image & Stats (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 sticky top-28"
          >
            {/* Image Container with Glow & Duotone Blend */}
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
              
              <div className="w-full h-full rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] overflow-hidden border border-white/10 shadow-2xl relative bg-neutral-900">
                <Image
                  src="/images/Tayyab.jpg"
                  alt="Tayyab Tariq"
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="glow-card p-5">
                <h3 className="text-3xl font-black text-white mb-1">3+</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Years Coding</p>
              </div>
              <div className="glow-card p-5">
                <h3 className="text-3xl font-black text-cyan-400 mb-1">10+</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Projects Built</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio & Education (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-12"
          >
            
            {/* Bio Text */}
            <div className="space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg">
              <p>
                Hello! I'm <strong className="text-white">Tayyab Tariq</strong>. My interest in Full stack development started not just with writing code, but with the desire to solve real-world problems.
              </p>
              <p>
                While I have extensive experience in frontend technologies like Next.js and Flutter, my true passion lies in Backend Architecture. I enjoy designing databases, optimizing API response times using NestJS, and ensuring security in digital ecosystems.
              </p>
              <p>
                I don't just write code; I engineer solutions. Whether it's a cross-platform mobile app or a complex collaboration tool, I prioritize scalability, maintainability, and user experience.
              </p>
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                <GraduationCap className="text-cyan-400" size={24} /> Education
              </h3>
              
              <div className="space-y-4">
                {/* Education Card 1 */}
                <div className="glow-card p-6 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">BS Computer Science</h4>
                        <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm">
                          Superior University <span className="w-1 h-1 bg-gray-600 rounded-full"></span> Lahore
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-cyan-300 border border-white/5 shrink-0 self-start sm:self-auto">
                        <Calendar size={12} /> 2022 - 2026
                      </span>
                   </div>
                </div>

                {/* Education Card 2 */}
                <div className="glow-card p-6 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Intermediate in CS</h4>
                        <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm">
                          Govt Islamia College, Civil Lines <span className="w-1 h-1 bg-gray-600 rounded-full"></span> Lahore
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-purple-300 border border-white/5 shrink-0 self-start sm:self-auto">
                        <Calendar size={12} /> 2020 - 2022
                      </span>
                   </div>
                </div>
              </div>
            </div>

            {/* "What Drives Me" Mini Grid */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                <Cpu className="text-purple-400" size={24} /> What Drives Me
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glow-card p-6">
                  <h4 className="font-bold text-white mb-2">Backend Logic</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">I love structuring data and logic. Node.js & NestJS are my go-to tools for heavy lifting.</p>
                </div>
                <div className="glow-card p-6">
                  <h4 className="font-bold text-white mb-2">Clean UI/UX</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">A powerful backend needs a beautiful frontend. I use Shadcn & Tailwind to ensure accessibility.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- TECHNICAL EXPERTISE SECTION (Bento / Cards) --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Technical Expertise</h2>
          <p className="text-gray-400">The tools and frameworks I use to bring ideas to life.</p>
        </div>

        {/* 5-Box Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-15 gap-6">
          
          {/* Box 1: Backend (Col span 2 on md, col span 3 on lg) */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-3 lg:col-span-5">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 text-cyan-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Terminal size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">Backend Engineering</h3>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                 Building robust, scalable APIs and microservices architectures.
               </p>
             </div>
             <ul className="space-y-2.5 border-t border-white/5 pt-4">
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2.5"></span>Node.js & Express</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2.5"></span>NestJS (Microservices)</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2.5"></span>Socket.io / WebSockets</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2.5"></span>REST APIs</li>
             </ul>
          </div>

          {/* Box 2: Frontend */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-3 lg:col-span-5">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layout size={22} className="text-purple-300" />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">Modern Frontend</h3>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                 Creating responsive, accessible, and attractive web interfaces.
               </p>
             </div>
             <ul className="space-y-2.5 border-t border-white/5 pt-4">
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2.5"></span>Next.js / React</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2.5"></span>Tailwind CSS / Shadcn</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2.5"></span>HTML / CSS / JS</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2.5"></span>Framer Motion</li>
             </ul>
          </div>

          {/* Box 3: Mobile */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-2 lg:col-span-5">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 border border-blue-500/20 text-blue-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">App Development</h3>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                 Extending functionality to mobile devices with native performance.
               </p>
             </div>
             <ul className="space-y-2.5 border-t border-white/5 pt-4">
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5"></span>Flutter (Dart)</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5"></span>Provider</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5"></span>Cross-platform Logic</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2.5"></span>Mobile UI/UX</li>
             </ul>
          </div>

          {/* Box 4: Databases (Col span 3 on lg) */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-2 lg:col-span-7lg lg:col-span-7">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">Database Architecture</h3>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                 Designing efficient schemas and optimizing query performance.
               </p>
             </div>
             <ul className="space-y-2.5 border-t border-white/5 pt-4">
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></span>MySQL & PostgreSQL</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></span>MongoDB (NoSQL)</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></span>Redis (Caching)</li>
             </ul>
          </div>

          {/* Box 5: DevOps */}
          <div className="glow-card p-8 flex flex-col justify-between group md:col-span-2 lg:col-span-8">
             <div>
               <div className="w-12 h-12 bg-gradient-to-tr from-orange-500/20 to-red-500/20 border border-orange-500/20 text-orange-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GitBranch size={22} />
               </div>
               <h3 className="text-lg font-bold text-white mb-3">DevOps & Tools</h3>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                 Ensuring smooth deployment and code management workflows.
               </p>
             </div>
             <ul className="space-y-2.5 border-t border-white/5 pt-4">
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2.5"></span>Git & GitHub</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2.5"></span>Docker & Containers</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2.5"></span>VS Code / Android Studio</li>
               <li className="flex items-center text-xs text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2.5"></span>Postman API Testing</li>
             </ul>
          </div>

        </div>
      </section>

      {/* --- CONNECT / MESSAGE SECTION --- */}
      <section className="py-20 bg-neutral-950/20 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-black mb-6">Let's Build Something Together</h2>
          <p className="text-gray-400 mb-10 text-base sm:text-lg max-w-2xl mx-auto">
            I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            
            {/* Email Box */}
            <a 
              href="mailto:tayyabtariq838@gmail.com" 
              className="glow-card flex items-center gap-4 p-5 w-full sm:w-auto hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-full group-hover:scale-110 transition-transform">
                <Mail size={22} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Drop me an email</p>
                <p className="text-white text-sm font-semibold">tayyabtariq838@gmail.com</p>
              </div>
            </a>

            {/* LinkedIn Box */}
            <a 
              href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" 
              target="_blank"
              rel="noreferrer"
              className="glow-card flex items-center gap-4 p-5 w-full sm:w-auto hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                <Linkedin size={22} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Let's Connect</p>
                <p className="text-white text-sm font-semibold">linkedin.com/in/tayyab</p>
              </div>
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}