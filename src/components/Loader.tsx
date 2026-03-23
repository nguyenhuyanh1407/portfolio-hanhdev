"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  progress: number;
}

export default function Loader({ progress }: LoaderProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (counterRef.current) {
      gsap.to(counterRef.current, {
        innerText: Math.round(progress),
        duration: 0.1,
        snap: { innerText: 1 },
        ease: "power1.out"
      });
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 100 && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.8,
        delay: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [progress]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none pointer-events-auto"
    >
      <div className="flex flex-col items-center">
        {/* Spinner quay quay kinh điển */}
        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4" />
        
        <div className="flex items-baseline gap-1">
          <span 
            ref={counterRef} 
            className="text-2xl font-bold text-white tracking-tight"
          >
            0
          </span>
          <span className="text-sm font-medium text-white/60">%</span>
        </div>
        
        <div className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2 font-medium">
           Loading Assets
        </div>
      </div>
    </div>
  );
}
