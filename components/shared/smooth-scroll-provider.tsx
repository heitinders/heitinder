"use client";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Lenis notifies ScrollTrigger on every scroll frame
    lenis.on("scroll", ScrollTrigger.update);

    // CRITICAL: store as named variable so gsap.ticker.remove() can find it.
    // An inline arrow cannot be removed and leaks on every hot reload.
    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // Refresh after fonts load so GSAP pin positions use correct element dimensions.
    // Guard against unmount before fonts resolve (happens on every hot reload in dev).
    let mounted = true;
    document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh(); });

    return () => {
      mounted = false;
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
