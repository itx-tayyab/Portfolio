"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Terminal, Database, Smartphone, Layout, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
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
            <Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
          <Link href="/contact" className="px-4 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-cyan-400 transition-all">
            Let's Talk
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      {/* Reduced pt-32 to pt-24 and md:pt-48 to md:pt-32 to fix the gap issue */}
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
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              experiences
            </span> that matter.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-lg leading-relaxed">
           I bridge the gap between complex backend logic and pixel-perfect UI. Specializing in Node.js architectures, Next.js interfaces, and Cross-platform Flutter apps.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            <Link href="/projects" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-all flex items-center gap-2">
              View Work <ArrowRight size={18} />
            </Link>
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
          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-4 text-white">Harmoni</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              All in One platform combining real-time messaging, task management, and file sharing. 
              Designed with a microservices-ready architecture using NestJS to handle high concurrency and Shadcn for a accessible, clean UI.
            </p>
            <Link href="/projects/harmoni" className="inline-flex items-center gap-2 text-cyan-400 hover:text-white transition-colors font-medium">
              View Case Study <ArrowRight size={16} />
            </Link>
          </div>

          {/* Visual */}
          <div className="relative h-64 lg:h-auto bg-neutral-800 order-1 lg:order-2 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
             <div className="absolute top-10 left-10 w-full h-full bg-neutral-950 rounded-tl-2xl border-t border-l border-white/10 shadow-2xl p-6 transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="w-full h-4 bg-white/10 rounded mb-4 w-1/3"></div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-white/5 rounded"></div>
                  <div className="w-full h-2 bg-white/5 rounded"></div>
                  <div className="w-3/4 h-2 bg-white/5 rounded"></div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="h-20 bg-cyan-500/10 rounded-lg border border-cyan-500/20"></div>
                  <div className="h-20 bg-white/5 rounded-lg border border-white/5"></div>
                </div>
             </div>
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

      {/* --- SERVICES / EXPERTISE --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Technical Expertise</h2>
          <p className="text-gray-400 mt-2">The tools I use to bring ideas to life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
              <Terminal size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Backend Engineering</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              My core interest. Building robust APIs and microservices.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 font-mono">
              <li>• Node.js & Express</li>
              <li>• NestJS (Architecture)</li>
              <li>• PostgreSQL / MongoDB</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900 border border-white/10 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Modern Frontend</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Creating responsive, accessible, and attractive interfaces.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 font-mono">
              <li>• Next.js / React</li>
              <li>• Tailwind / Bootstrap 5</li>
              <li>• Shadcn UI / Framer Motion</li>
            </ul>
          </div>

           <div className="p-8 rounded-2xl bg-neutral-900 border border-white/10 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">App Development</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Extending functionality to mobile devices.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 font-mono">
              <li>• Flutter (Dart)</li>
              <li>• Cross-platform Logic</li>
              <li>• Mobile UI/UX</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- UPDATED FOOTER (Matching Image) --- */}
      <footer className="bg-neutral-950 pt-20 pb-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Column 1: Identity (Span 6) */}
            <div className="md:col-span-6 space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Tayyab Tariq</h3>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                I build practical, user-focused solutions that balance performance, usability, and scalability. My goal is to create products that are not only functional, but genuinely valuable.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Column 2: Sitemap (Span 2) */}
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

            {/* Column 3: Get In Touch (Span 4) */}
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

          {/* Copyright Bottom */}
          <div className="pt-8 border-t border-white/10 text-center md:text-left">
            <p className="text-gray-600 text-center text-sm">
              &copy; {/*{new Date().getFullYear()}*/} 2025 Tayyab Tariq. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}