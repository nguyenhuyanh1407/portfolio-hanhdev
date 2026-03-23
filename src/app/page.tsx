"use client";

import { useEffect } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import CanvasRenderer from "@/components/CanvasRenderer";
import StoryOverlays from "@/components/StoryOverlays";
import Navigation from "@/components/Navigation";
import PersonalInfo from "@/components/PersonalInfo";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const { imagesRef, progress, isLoaded } = useImagePreloader();

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative text-white selection:bg-white/30 selection:text-white">
        {/* Preloader blocks the UI completely until ready */}
        {!isLoaded && <Loader progress={progress} />}

        {/* Global UI (will only show when scrolling but we render them to mount their own GSAP/fades) */}
        <Navigation />
        <PersonalInfo />

        {/* Cinematic sequence & storytelling wrapper */}
        <div 
           className="relative w-full" 
           style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 1s ease 0.5s" }}
        >
           {/* Background Canvas (Fixed) */}
           <CanvasRenderer imagesRef={imagesRef} isLoaded={isLoaded} />
           
           {/* Story Overlays (Normal flow, 600vh height total provided by the 6 sections) */}
           <StoryOverlays />
        </div>
      </main>
    </SmoothScroll>
  );
}
