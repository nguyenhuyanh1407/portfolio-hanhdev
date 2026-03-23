"use client";

import { useState, useEffect, useRef } from "react";
import { TOTAL_FRAMES, getFramePath } from "@/utils/frameUtils";

export const useImagePreloader = () => {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mounted = useRef(true);

  if (imagesRef.current.length === 0) {
     imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
  }

  useEffect(() => {
    mounted.current = true;
    let currentLoadedCount = 0;
    let lastRenderedCount = 0;

    // Use native Image with async decoding. This lets the browser manage the RAM/disk cache
    // smartly without exhausting memory like raw ImageBitmaps would (which caused the black screen lag).
    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async"; 
        img.src = getFramePath(index);
        
        img.onload = () => {
           imagesRef.current[index] = img;
           currentLoadedCount++;
           // Throttle state updates to keep Main Thread clean
           if (mounted.current && (currentLoadedCount - lastRenderedCount >= 10 || currentLoadedCount === TOTAL_FRAMES)) {
               lastRenderedCount = currentLoadedCount;
               setLoadedCount(currentLoadedCount);
           }
           resolve();
        };

        img.onerror = () => {
           imagesRef.current[index] = null;
           currentLoadedCount++;
           resolve();
        };
      });
    };

    const loadSequence = async () => {
      // 1. Priority Load (First 200 frames to show the 1st section ASAP)
      const PRIORITY_COUNT = Math.min(200, TOTAL_FRAMES);
      const priorityPromises = [];
      
      for (let i = 0; i < PRIORITY_COUNT; i++) {
         priorityPromises.push(loadImage(i));
      }
      
      await Promise.all(priorityPromises);
      
      if (mounted.current) {
          setLoadedCount(currentLoadedCount);
          setIsLoaded(true);
      }

      // 2. Background Load
      let i = PRIORITY_COUNT;
      const loadNextChunk = async () => {
        if (!mounted.current || i >= TOTAL_FRAMES) return;
        
        const CHUNK_SIZE = 10; 
        const chunkPromises = [];
        for (let j = 0; j < CHUNK_SIZE && i + j < TOTAL_FRAMES; j++) {
            chunkPromises.push(loadImage(i + j));
        }
        
        await Promise.all(chunkPromises);
        i += CHUNK_SIZE;
        
        if (mounted.current && i < TOTAL_FRAMES) {
            setTimeout(loadNextChunk, 20); // Breathe
        }
      };
      
      setTimeout(loadNextChunk, 100);
    };

    loadSequence();

    return () => {
      mounted.current = false;
    };
  }, []);

  const priorityTotal = Math.min(200, TOTAL_FRAMES);
  const displayProgress = isLoaded ? 100 : Math.round((Math.min(loadedCount, priorityTotal) / priorityTotal) * 100);

  return { imagesRef, loadedCount, progress: displayProgress, isLoaded };
};
