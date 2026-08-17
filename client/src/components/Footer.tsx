import { Github, Linkedin, ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505]/40 pt-20 pb-12 overflow-hidden">
      {/* Top Divider with Soft Glowing Effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-purple-500/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl rounded-full opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl font-black tracking-tight text-white">
              Tayyab <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Tariq</span>
            </h3>
            <p className="text-gray-400 max-w-sm leading-relaxed text-sm">
              I build practical, user-focused solutions that balance performance, usability, and scalability. My goal is to create products that are not only functional, but genuinely valuable.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://github.com/itx-tayyab" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/tayyab-tariq-a51379260/" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-purple-400 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Sitemap</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact/Get in Touch */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-xs font-bold tracking-widest text-purple-400 uppercase">Get in touch</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="leading-relaxed">
                Have a project in mind? I’m always open to exploring opportunities that challenge me to create high-quality, scalable solutions.
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs">
                <Mail size={14} className="text-cyan-400" />
                <span>tayyabtariq838@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin size={14} className="text-purple-400" />
                <span>Pakistan (Remote Available)</span>
              </div>
            </div>
            <div>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-500/20 hover:scale-105"
              >
                Start a Conversation <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Tayyab Tariq. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold">Next.js & Tailwind CSS v4</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
