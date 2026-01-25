import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 pt-20 pb-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
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

        <div className="pt-8 border-t border-white/10 text-center md:text-left">
          <p className="text-gray-600 text-center text-sm">
            &copy; {new Date().getFullYear()} Tayyab Tariq. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
