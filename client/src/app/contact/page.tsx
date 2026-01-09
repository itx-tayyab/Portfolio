"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  // Simple state for form handling (Visual only for this demo)
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
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
            <Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
            <Link href="/contact" className="text-cyan-400 transition-colors">Contact</Link>
          </div>
          <Link href="/contact" className="px-4 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-cyan-400 transition-all">
            Let's Talk
          </Link>
        </div>
      </nav>

      {/* --- PAGE HEADER --- */}
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto text-center md:text-left">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.span variants={fadeInUp} className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-4 block">
            Get in Touch
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Let’s start a <br /> conversation.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Interested in working together? Whether you have a question about backend architecture, need a full-stack solution, or just want to say hi, I'd love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* --- MAIN CONTACT SECTION --- */}
      <section className="pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Contact Info & Status */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Status Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 flex items-start gap-4">
              <div className="p-3 bg-green-500/10 text-green-400 rounded-full">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Current Availability</h3>
                <p className="text-gray-400 text-sm">
                  I am currently <span className="text-green-400 font-bold">Available</span> for freelance projects and open to discussing full-time opportunities.
                </p>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Details</h3>
              
              <a href="mailto:your.email@example.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                  <p className="font-medium">tayyabtariq838@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center border border-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                  <p className="font-medium">Pakistan (Remote Available)</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Social Profiles</h3>
              <div className="flex gap-4">
                <a href="https://github.com/itx-tayyab" className="p-4 bg-neutral-900 rounded-xl border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" className="p-4 bg-neutral-900 rounded-xl border border-white/10 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-4 bg-neutral-900 rounded-xl border border-white/10 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-300">
                  <MessageSquare size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-neutral-900 border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            {/* Ambient Background Glow in Form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Project Inquiry / Collaboration" 
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..." 
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-700 resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === "submitting" || formStatus === "success"}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  formStatus === "success" 
                    ? "bg-green-500 text-white hover:bg-green-600" 
                    : "bg-white text-black hover:bg-cyan-400 hover:scale-[1.02]"
                }`}
              >
                {formStatus === "idle" && (
                  <>Send Message <Send size={18} /></>
                )}
                {formStatus === "submitting" && (
                  <span className="animate-pulse">Sending...</span>
                )}
                {formStatus === "success" && (
                  <>Message Sent! <CheckCircle size={20} /></>
                )}
              </button>
            </form>
          </motion.div>

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
                <a href="https://github.com/itx-tayyab" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/tayyab-tariq-a51379260" className="p-3 rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black transition-all">
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