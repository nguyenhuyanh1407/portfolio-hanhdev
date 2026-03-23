"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StoryOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const sections = gsap.utils.toArray(".story-section");

    sections.forEach((section: any, index) => {
      // Setup the timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 30%", // Start animating when the section reaches top 30% of viewport
          end: "bottom 70%", // Finish when it reaches bottom 70%
          scrub: 1, // Smooth scrubbing
        }
      });

      // Animate text elements (fade and slide)
      const elements = section.querySelectorAll("h1, p, div, button, a");
      
      tl.fromTo(elements, {
        opacity: 0,
        y: 40,
        filter: "blur(4px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.1,
        ease: "power2.out",
        duration: 2
      })
      // Hold state in the middle of scroll
      .to(elements, {
        opacity: 1,
        duration: 3
      })
      // Fade out as it scrolls away
      .to(elements, {
        opacity: 0,
        y: -40,
        filter: "blur(4px)",
        stagger: 0.05,
        ease: "power2.in",
        duration: 1.5
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10">
      
      {/* FRAME 1 — CRASH ZONE (0–15%) */}
      <section className="story-section h-[280vh] w-full relative">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-between px-12 md:px-24 pointer-events-auto">
          <div className="flex-1" />
          <div className="flex-[2] text-center fade-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              "I stepped into the system..."
            </h1>
            <p className="text-xl md:text-2xl text-white/70 italic">
              "Everything was broken. Nothing made sense."
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative group pointer-events-auto">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
               <div className="relative bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/5 flex flex-col items-start gap-5">
                  <div className="absolute top-5 right-5 text-[8px] text-white/30 tracking-[0.3em] font-mono">SYS.ID // 01</div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-extralight tracking-tight text-white">
                      Nguyễn <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Huy Anh</span>
                    </h3>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-blue-500 mt-2" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-light text-white/50">Core / Branch</p>
                    <p className="text-base text-white/80 font-medium">Software Engineer</p>
                    <p className="text-xs text-purple-300 font-mono opacity-80">(Unity / Web GL Architect)</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 2 — LOST ZONE (15–30%) */}
      <section className="story-section h-[280vh] w-full relative">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-between px-12 md:px-24 pointer-events-auto">
          <div className="flex-1 slide-left max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              "Too many paths. No clear direction."
            </h1>
            <p className="text-xl md:text-2xl text-white/50">
              The noise was overwhelming. Finding the right architecture felt impossible.
            </p>
          </div>
          <div className="flex-1" />
          <div className="flex-1 flex justify-end">
            <a href="#projects" className="group flex items-center gap-4 text-white hover:text-purple-400 transition-colors">
               <span className="text-xl tracking-widest uppercase">Explore Projects</span>
               <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* FRAME 3 — STABLE ZONE (30–50%) */}
      <section className="story-section h-[280vh] w-full relative">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-between px-12 md:px-24 pointer-events-auto">
          <div className="flex-1 slide-left max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              "Then things started to make sense."
            </h1>
            <p className="text-xl md:text-2xl text-white/50">
              Patterns emerged. Logic prevailed. The chaos became structured.
            </p>
          </div>
          <div className="flex-1" />
          <div className="flex-1 flex justify-end">
            <a href="#games" className="group flex items-center gap-4 text-white hover:text-blue-400 transition-colors">
               <span className="text-xl tracking-widest uppercase">View Games</span>
               <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* FRAME 4 — REDIRECT ZONE (50–70%) */}
      <section className="story-section h-[280vh] w-full relative">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-between px-12 md:px-24 pointer-events-auto">
          <div className="flex-1 max-w-lg slide-left">
             <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-yellow-500/20">
                <h3 className="text-xl text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Services & Expertise</h3>
                <ul className="space-y-4 text-lg">
                   <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Web Development</li>
                   <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400" /> Unity Game Design</li>
                   <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-400" /> 3D Interactive Web</li>
                   <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-green-400" /> System Architecture</li>
                </ul>
             </div>
          </div>
          <div className="flex-[1.5] text-right">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              "The path became clear."
            </h1>
            <p className="text-xl md:text-2xl text-white/50 italic">
              "Not just code — but systems."
            </p>
          </div>
        </div>
      </section>

      {/* FRAME 5 — BREAKTHROUGH (70–90%) */}
      <section className="story-section h-[280vh] w-full relative">
        <div className="sticky top-0 left-0 h-screen w-full flex flex-col items-center justify-center pointer-events-auto">
          <div className="text-center max-w-3xl">
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-400 mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
               BREAKTHROUGH
             </h1>
             <p className="text-2xl text-white/80 mb-12">
               Let's build something extraordinary together.
             </p>
             <button className="px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-300">
               Get In Touch
             </button>
          </div>
        </div>
      </section>

      {/* FRAME 6 — LOOP RESET (90–100%) */}
      <section className="story-section h-[280vh] w-full relative">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-center pointer-events-auto">
          <div className="text-center">
             {/* Barely visible hint or completely empty as requested */}
             <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto opacity-0" />
          </div>
        </div>
      </section>

    </div>
  );
}
