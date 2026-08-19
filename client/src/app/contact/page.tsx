"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Github, Linkedin, Mail, MapPin, Send, MessageSquare,
  Clock, CheckCircle
} from "lucide-react";
import Link from "next/link";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen mesh-gradient-bg text-white font-sans selection:bg-cyan-500/30 selection:text-white">

      {/* --- PAGE HEADER --- */}
      <section className="pt-12 pb-16 px-6 max-w-6xl mx-auto text-center lg:text-left">
        
      </section>

      {/* --- MAIN CONTACT SECTION --- */}
      <section className="pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Contact Info & Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-10"
          >
            {/* Status Card with Glowing pulse dot */}
            <div className="glow-card p-6 flex items-start gap-4">
              <div className="p-3 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20 shrink-0 relative">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Current Availability</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I am currently <span className="text-green-400 font-bold">Available</span> for freelance projects and open to discussing full-time opportunities.
                </p>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-white tracking-wide uppercase text-xs text-cyan-400">Contact Details</h3>

              <a href="mailto:tayyabtariq838@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="w-12 h-12 bg-neutral-900/60 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Email</p>
                  <p className="font-semibold text-sm">tayyabtariq838@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-neutral-900/60 rounded-xl flex items-center justify-center border border-white/5">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Location</p>
                  <p className="font-semibold text-sm">Pakistan (Remote Available)</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-white tracking-wide uppercase text-xs text-purple-400">Social Profiles</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/itx-tayyab"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-white/5 rounded-xl border border-white/5 text-gray-400 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/tayyab-tariq-a51379260/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-white/5 rounded-xl border border-white/5 text-gray-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:scale-105 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 glow-card p-8 md:p-10 relative overflow-hidden"
          >
            {/* Ambient Background Glow inside Form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <MessageSquare className="text-cyan-400" size={20} /> Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-mono tracking-wider">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 transition-all placeholder:text-gray-700 text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-mono tracking-wider">Your Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 transition-all placeholder:text-gray-700 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-mono tracking-wider">Subject</label>
                <input
                  type="text"
                  placeholder="Project Inquiry / Collaboration"
                  className="w-full bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 transition-all placeholder:text-gray-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-mono tracking-wider">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 transition-all placeholder:text-gray-700 text-sm resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting" || formStatus === "success"}
                className={`w-full py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 ${formStatus === "success"
                    ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
                    : "bg-white text-black hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 hover:text-white hover:scale-[1.01] shadow-lg hover:shadow-cyan-400/20"
                  }`}
              >
                {formStatus === "idle" && (
                  <>Send Message <Send size={16} /></>
                )}
                {formStatus === "submitting" && (
                  <span className="animate-pulse">Sending...</span>
                )}
                {formStatus === "success" && (
                  <>Message Sent! <CheckCircle size={18} /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

    </div>
  );
}