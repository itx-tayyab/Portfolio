"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Linkedin, Mail, GraduationCap, Cpu, Calendar, Terminal, Layout, Smartphone, Database, Cloud, GitBranch } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black font-sans">
    
      {/* --- HERO / HEADER --- */}
      <section className="relative pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.span variants={fadeInUp} className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-4 block">
            The Story So Far
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Driven by Logic, <br /> Inspired by <span className="text-gray-500">Innovation.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I am a Full Stack developer with a passion for building complex, scalable systems. My journey is defined by a curiosity for how things work under the hood.
          </motion.p>
        </motion.div>
      </section>

      {/* --- MAIN BIOGRAPHY & EDUCATION SECTION --- */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left: Image & Stats (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-8 sticky top-24"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group shadow-2xl shadow-cyan-900/20">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 z-10"></div>
              
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-gray-600 relative">
                <Image
                  src="/images/Tayyab.jpg"
                  alt="Tayyab Tariq"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <h3 className="text-3xl font-bold text-white mb-1">3+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Years Coding</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <h3 className="text-3xl font-bold text-cyan-400 mb-1">10+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Projects Built</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio & Education (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 space-y-12"
          >
            
            {/* Bio Text */}
            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
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
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="text-cyan-400" size={24} /> Education
              </h3>
              
              <div className="space-y-4">
                {/* Education Card 1 */}
                <div className="group bg-neutral-900/50 border border-white/10 p-6 rounded-2xl hover:border-cyan-500/30 hover:bg-neutral-900 transition-all duration-300 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 transition-colors"></div>
                   <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 relative z-10">
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">BS Computer Science</h4>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                          Superior University <span className="w-1 h-1 bg-gray-600 rounded-full"></span> Lahore
                        </p>
                      </div>
                      <span className="mt-2 sm:mt-0 inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-cyan-300 border border-white/5">
                        <Calendar size={12} /> 2022 - 2026
                      </span>
                   </div>
                </div>

                {/* Education Card 2 */}
                <div className="group bg-neutral-900/50 border border-white/10 p-6 rounded-2xl hover:border-purple-500/30 hover:bg-neutral-900 transition-all duration-300">
                   <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Intermediate in CS</h4>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                          Govt Islamia College, Civil Lines <span className="w-1 h-1 bg-gray-600 rounded-full"></span> Lahore
                        </p>
                      </div>
                      <span className="mt-2 sm:mt-0 inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-purple-300 border border-white/5">
                        <Calendar size={12} /> 2020 - 2022
                      </span>
                   </div>
                </div>
              </div>
            </div>

            {/* "What Drives Me" Mini Grid */}
            <div>
               <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="text-purple-400" size={24} /> What Drives Me
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-neutral-900 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="font-bold text-white mb-2">Backend Logic</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">I love structuring data and logic. Node.js & NestJS are my go-to tools for heavy lifting.</p>
                </div>
                <div className="p-5 bg-neutral-900 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="font-bold text-white mb-2">Clean UI/UX</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">A powerful backend needs a beautiful frontend. I use Shadcn & Tailwind to ensure accessibility.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- NEW SECTION: TECHNICAL EXPERTISE (5 Boxes) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-gray-400">The tools and frameworks I use to bring ideas to life.</p>
        </div>

        {/* 5-Box Layout using Flex-Wrap for centering */}
        <div className="flex flex-wrap justify-center gap-6">
          
          {/* Box 1: Backend */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group relative bg-neutral-900/50 border border-white/10 p-8 rounded-2xl hover:bg-neutral-900 hover:border-cyan-500/30 transition-all duration-300">
             <div className="w-12 h-12 bg-cyan-900/20 text-cyan-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Terminal size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-3">Backend Engineering</h3>
             <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
               Building robust, scalable APIs and microservices architectures.
             </p>
             <ul className="space-y-2">
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3"></span>Node.js & Express</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3"></span>NestJS (Microservices)</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3"></span>Socket.io / WebSockets</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3"></span>REST APIs</li>
             </ul>
          </div>

          {/* Box 2: Frontend */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group relative bg-neutral-900/50 border border-white/10 p-8 rounded-2xl hover:bg-neutral-900 hover:border-purple-500/30 transition-all duration-300">
             <div className="w-12 h-12 bg-purple-900/20 text-purple-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-3">Modern Frontend</h3>
             <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
               Creating responsive, accessible, and attractive web interfaces.
             </p>
             <ul className="space-y-2">
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>Next.js / React</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>Tailwind CSS / Shadcn</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>HTML / CSS / JavaScript</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>Framer Motion</li>
             </ul>
          </div>

          {/* Box 3: Mobile */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group relative bg-neutral-900/50 border border-white/10 p-8 rounded-2xl hover:bg-neutral-900 hover:border-blue-500/30 transition-all duration-300">
             <div className="w-12 h-12 bg-blue-900/20 text-blue-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-3">App Development</h3>
             <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
               Extending functionality to mobile devices with native performance.
             </p>
             <ul className="space-y-2">
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>Flutter (Dart)</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>Provider</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>Cross-platform Logic</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>Mobile UI/UX</li>
             </ul>
          </div>

          {/* Box 4: Databases */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group relative bg-neutral-900/50 border border-white/10 p-8 rounded-2xl hover:bg-neutral-900 hover:border-emerald-500/30 transition-all duration-300">
             <div className="w-12 h-12 bg-emerald-900/20 text-emerald-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-3">Database Architecture</h3>
             <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
               Designing efficient schemas and optimizing query performance.
             </p>
             <ul className="space-y-2">
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>MySQL,PostgreSQL (SQL)</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>MongoDB (NoSQL)</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>Redis (Caching)</li>
             </ul>
          </div>

          {/* Box 5: DevOps & Tools */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group relative bg-neutral-900/50 border border-white/10 p-8 rounded-2xl hover:bg-neutral-900 hover:border-orange-500/30 transition-all duration-300">
             <div className="w-12 h-12 bg-orange-900/20 text-orange-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GitBranch size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-3">DevOps & Tools</h3>
             <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
               Ensuring smooth deployment and code management workflows.
             </p>
             <ul className="space-y-2">
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>Git & GitHub</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>Docker & Containers</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>VS Code & Android Studio</li>
               <li className="flex items-center text-sm text-gray-500 font-mono"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>Postman</li>
             </ul>
          </div>

        </div>
      </section>

      {/* --- CONNECT / MESSAGE SECTION --- */}
      <section className="py-20 bg-neutral-900/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Build Something Together</h2>
          <p className="text-gray-400 mb-10 text-lg">
            I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            
            {/* Email Box */}
            <a href="mailto:tayyabtariq838@gmail.com" className="group flex items-center gap-4 p-6 w-full md:w-auto bg-neutral-950 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-full group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Drop me an email</p>
                <p className="text-white font-medium">tayyabtariq838@gmail.com</p>
              </div>
            </a>

            {/* LinkedIn Box */}
            <a href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" className="group flex items-center gap-4 p-6 w-full md:w-auto bg-neutral-950 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Let's Connect</p>
                <p className="text-white font-medium">linkedin.com/in/tayyab</p>
              </div>
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}