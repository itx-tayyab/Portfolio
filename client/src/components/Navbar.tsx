import Link from "next/link";

export default function Navbar() {
  return (
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
  );
}
