"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Smartphone, Globe, Database, Layers, MessageSquare, Download, ArrowUpRight } from "lucide-react";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="flex-1 space-y-1"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for Freelance & Full-time
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-5xl font-bold leading-tight tracking-tight">
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              experiences
            </span> that matter.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-lg leading-relaxed">
           I bridge the gap between complex backend logic and pixel-perfect UI. Specializing in Node.js architectures, Next.js interfaces, and Cross-platform Flutter apps.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            <Link href="/projects" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all flex items-center gap-2">
              View Work <ArrowRight size={18} />
            </Link>
            
            {/* Download Resume Button */}
            <a
              href="/images/tayyab.pdf"
              download="tayyab.pdf"
              className="px-8 py-3 bg-transparent border border-white/20 text-white hover:bg-white hover:text-black font-bold rounded-full transition-all flex items-center gap-2"
            >
              Download CV <Download size={18} />
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href="https://github.com/itx-tayyab" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 transition-all"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 transition-all"><Linkedin size={20} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 transition-all"><Mail size={20} /></a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Visual/Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center hover:rotate-0 transition-all duration-500 shadow-2xl shadow-cyan-500/20 relative">
              <Image
                src="/images/Tayyab.jpg"
                alt="profile_pic"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- TECH STACK STRIP --- */}
      <div className="border-y border-white/5 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-center md:justify-between gap-8 md:gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {['Next.js', 'Node.js', 'NestJS', 'Flutter', 'PostgreSQL', 'Shadcn UI'].map((tech) => (
             <span key={tech} className="text-xl font-bold font-mono text-gray-300">{tech}</span>
           ))}
        </div>
      </div>

      {/* --- FEATURED PROJECT SPOTLIGHT (FYP) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-bold tracking-widest text-sm uppercase"
          >
            Featured Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mt-3 mb-6"
          >
            Highlighted Projects I’ve Worked On
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A few projects that reflect my ability to build scalable, efficient, and user-focused digital solutions.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10 bg-neutral-900"
        >
          {/* LEFT SIDE: Text Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex gap-2 mb-6">
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-300">NestJS</span>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-purple-300">Next.js</span>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-blue-300">Socket.io</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Streamlining Team Efficiency</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Designed with a microservices-ready architecture using NestJS to handle high concurrency. It features an AI Meeting Assistant that transcribes conversations and automatically assigns tasks.
            </p>
            <Link href="/projects/harmoni" className="inline-flex items-center gap-2 text-cyan-400 hover:text-white transition-colors font-medium">
              View Case Study <ArrowRight size={16} />
            </Link>
          </div>

          {/* RIGHT SIDE: Project Image (Fixed to be Full Width/Height) */}
          <div className="relative h-64 lg:h-auto min-h-[300px] w-full bg-neutral-800 order-1 lg:order-2 overflow-hidden group">
             {/* 
                NOTE: 'object-cover' forces the image to fill the entire container.
                Ensure your image file (harmoni.png) does not have transparent borders.
             */}
             <Image 
                src="/images/Harmonihome.png"
                alt="Harmoni Dashboard"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
             />
             {/* Optional: Dark overlay that vanishes on hover */}
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
          </div>
        </motion.div>
      </section>

      {/* --- ABOUT SNIPPET --- */}
      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Turning vision into reality through code</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
           Beyond the code, I’m focused on engineering reliable systems and crafting user experiences that feel seamless. From backend architecture to frontend polish, I aim to build products that are efficient, secure, and easy to use.
          </p>
          <Link href="/about" className="inline-block px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all font-medium">
            Read My Journey
          </Link>
        </div>
      </section>

      {/* --- REPLACED: NEW "WHAT I DO" SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Services I Offer</h2>
          <p className="text-gray-400 text-lg">Expert in building modern, high-performance applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Mobile */}
          <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-3xl hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/20">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <Smartphone size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Mobile Development</h3>
            <p className="text-gray-400 text-sm leading-7">
              I build high-performance cross-platform mobile apps using Flutter, delivering smooth 60fps experiences, clean UI, and intuitive user journeys.
            </p>
          </div>

          {/* Card 2: Web */}
          <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-3xl hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/20">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
              <Globe size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
            <p className="text-gray-400 text-sm leading-7">
              I create responsive, SEO-optimized web applications with Next.js and React, focused on speed, accessibility, and modern design standards.
            </p>
          </div>

          {/* Card 3: Backend */}
          <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-3xl hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/20">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <Database size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Backend Integration</h3>
            <p className="text-gray-400 text-sm leading-7">
              I develop and integrate secure, scalable backend systems using Node.js, NestJS, and PostgreSQL, with a strong emphasis on API security and performance.
            </p>
          </div>

          {/* Card 4: Full Stack */}
          <div className="group p-8 bg-neutral-900/50 border border-white/5 rounded-3xl hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/20">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <Layers size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Full-Stack Solutions</h3>
            <p className="text-gray-400 text-sm leading-7">
              From UI/UX design to database architecture, I manage the complete product lifecycle, delivering end-to-end, production-ready solutions.
            </p>
          </div>

        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-3xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px]"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            Have a project in mind?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Whether you need a complex backend architecture, a stunning frontend, or a full-stack solution, I am ready to help you bring your vision to life.
          </p>
          <div className="relative z-10">
             <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
               Start a Conversation <MessageSquare size={20} />
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}