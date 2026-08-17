"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl glass-pill rounded-full py-2 px-3 md:px-6">
      <div className="flex items-center justify-between">
        <Link 
          href="/" 
          className="text-base md:text-lg font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Tayyab Tariq
        </Link>
        <div className="flex items-center gap-1 md:gap-4">
          <div className="flex space-x-1 md:space-x-2 text-xs md:text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-300 ${
                    isActive 
                      ? "text-cyan-400 font-semibold" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>
          <Link 
            href="/contact" 
            className="hidden sm:inline-block px-4 py-1.5 text-xs font-semibold bg-white text-black rounded-full hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-400/20"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </nav>
  );
}
