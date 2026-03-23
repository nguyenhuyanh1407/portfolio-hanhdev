"use client";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-transparent backdrop-blur-sm border-b border-white/5 py-4" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
         <div className="font-bold text-xl tracking-tighter text-white">NHA.</div>
         <ul className="flex items-center gap-8 text-sm font-medium text-white/70">
           <li className="hover:text-white transition-colors cursor-pointer">About</li>
           <li className="hover:text-white transition-colors cursor-pointer">Projects</li>
           <li className="hover:text-white transition-colors cursor-pointer">Games</li>
           <li className="hover:text-white transition-colors cursor-pointer">Services</li>
           <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
         </ul>
         {/* Cân bằng logo */}
         <div className="w-12 md:block hidden" />
      </div>
    </nav>
  );
}
