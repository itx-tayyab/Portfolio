"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Download, Briefcase, GraduationCap, Code, Cpu } from "lucide-react";
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

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* --- NAVIGATION (Same as Home) --- */}
      <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Tayyab Tariq
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/about" className="text-cyan-400 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
          <Link href="/contact" className="px-4 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-cyan-400 transition-all">
            Let's Talk
          </Link>
        </div>
      </nav>

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
            I am a Software Engineer with a passion for building complex, scalable systems. My journey is defined by a curiosity for how things work under the hood.
          </motion.p>
        </motion.div>
      </section>

      {/* --- MAIN BIOGRAPHY SECTION --- */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left: Image & Quick Stats (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-8 sticky top-24"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 z-10"></div>
              {/* Replace with your actual image */}
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-gray-600">
                <Image
                  src="/images/Tayyab.jpg"
                  alt="profile_pic"
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

            {/* Resume Button */}
            <a href="/resume.pdf" download className="flex items-center justify-center gap-2 w-full py-4 bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded-xl text-white font-medium transition-all group">
              <Download size={18} /> Download CV / Resume
            </a>
          </motion.div>

          {/* Right: Detailed Content (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 space-y-12"
          >
            
            {/* Bio Text */}
            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                Hello! I'm <strong className="text-white">Tayyab Tariq</strong>. My interest in software development started not just with writing code, but with the desire to solve real-world problems.
              </p>
              <p>
                While I have extensive experience in frontend technologies like Next.js and Flutter, my true passion lies in Backend Architecture. I enjoy designing databases, optimizing API response times using NestJS, and ensuring security in digital ecosystems.
              </p>
              <p>
                I don't just write code; I engineer solutions. Whether it's a cross-platform mobile app or a complex collaboration tool, I prioritize scalability, maintainability, and user experience.
              </p>
            </div>

            {/* Education & Experience Timeline */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="text-cyan-400" size={24} /> Experience & Education
              </h3>
              <div className="space-y-8 border-l-2 border-white/10 ml-3 pl-8 relative">
                
                {/* Timeline Item 1 */}
                <div className="relative">
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-neutral-950 border-2 border-cyan-500"></span>
                  <div className="mb-1 text-sm text-cyan-400 font-bold uppercase tracking-wider">Present</div>
                  <h4 className="text-xl font-bold text-white">Computer Science Undergraduate</h4>
                  <p className="text-gray-400 mt-1">Superior University • Final Year</p>
                  <p className="text-sm text-gray-500 mt-2">Specializing in Full Stack Web Development. Leading the development of "Harmoni" (FYP).</p>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative">
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-neutral-950 border-2 border-gray-600 group-hover:border-cyan-500 transition-colors"></span>
                  <div className="mb-1 text-sm text-gray-500 font-bold uppercase tracking-wider">Jan 2025 -July 2025</div>
                  <h4 className="text-xl font-bold text-white">Freelance Web Developer</h4>
                  <p className="text-gray-400 mt-1">Remote</p>
                  <p className="text-sm text-gray-500 mt-2">Delivered custom web solutions to various clients.</p>
                </div>

                 {/* Timeline Item 3 */}
                 <div className="relative">
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-neutral-950 border-2 border-gray-600"></span>
                  <div className="mb-1 text-sm text-gray-500 font-bold uppercase tracking-wider">2025 - 2026</div>
                  <h4 className="text-xl font-bold text-white">App Development Projects</h4>
                  <p className="text-gray-400 mt-1">Flutter & Dart</p>
                  <p className="text-sm text-gray-500 mt-2">Built cross-platform mobile applications focused on utility and e-commerce.</p>
                </div>

              </div>
            </div>

            {/* "What I Do" Mini Grid */}
            <div>
               <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="text-purple-400" size={24} /> What Drives Me
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-900 rounded-xl border border-white/5">
                  <h4 className="font-bold text-white mb-2">Backend Logic</h4>
                  <p className="text-sm text-gray-400">I love structuring data and logic. Node.js & NestJS are my go-to tools for heavy lifting.</p>
                </div>
                <div className="p-4 bg-neutral-900 rounded-xl border border-white/5">
                  <h4 className="font-bold text-white mb-2">Clean UI/UX</h4>
                  <p className="text-sm text-gray-400">A powerful backend needs a beautiful frontend. I use Shadcn & Tailwind to ensure accessibility.</p>
                </div>
              </div>
            </div>

          </motion.div>
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
            <a href="mailto:your.email@example.com" className="group flex items-center gap-4 p-6 w-full md:w-auto bg-neutral-950 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all">
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

      {/* --- FOOTER (Exact Match) --- */}
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
                <a href="" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all">
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
              &copy; 2025 Tayyab Tariq. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}