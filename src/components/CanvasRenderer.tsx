"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOTAL_FRAMES } from "@/utils/frameUtils";

gsap.registerPlugin(ScrollTrigger);

interface CanvasRendererProps {
  imagesRef: React.MutableRefObject<(HTMLImageElement | null)[]>;
  isLoaded: boolean;
}

export default function CanvasRenderer({ imagesRef, isLoaded }: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); 
    if (!ctx) return;
    
    let currentFrame = 0;
    
    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (img && img.complete) {
        const dpr = window.devicePixelRatio || 1;
        // Tăng độ phân giải Canvas bằng dpr để chống mờ (Retina Displays)
        if (canvas.width !== window.innerWidth * dpr) {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
        }

        const scale = Math.max(canvas.width / 1920, canvas.height / 1080);
        const dWidth = 1920 * scale;
        const dHeight = 1080 * scale;
        const dx = (canvas.width - dWidth) / 2;
        const dy = (canvas.height - dHeight) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, dx, dy, dWidth, dHeight);
      }
    };
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2, // Giảm từ 1.5 xuống 0.2 để frame bám sát chuột tức thì, KHÔNG BỊ KHỰNG
      onUpdate: (self) => {
        const targetFrame = Math.min(
           TOTAL_FRAMES - 1, 
           Math.max(0, Math.floor(self.progress * (TOTAL_FRAMES - 1)))
        );
        if (targetFrame !== currentFrame) {
            currentFrame = targetFrame;
            if (imagesRef.current[targetFrame]) {
                renderFrame(targetFrame);
            }
        }
      }
    });

    const handleResize = () => {
       const dpr = window.devicePixelRatio || 1;
       canvas.width = window.innerWidth * dpr;
       canvas.height = window.innerHeight * dpr;
       renderFrame(currentFrame);
    };
    window.addEventListener("resize", handleResize);

    // Initial render
    if (isLoaded) {
        setTimeout(() => renderFrame(0), 50);
    }

    return () => {
      st.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesRef, isLoaded]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Làm sáng màn hình: Giảm đen kịt và bỏ mix-blend-multiply để ảnh trong trẻo hơn */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
    </div>
  );
}
