"use client";
import { useRef, useState, useEffect } from "react";

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function FadeIn({ children, delay = 0.1, className = "", variant = "fade-up" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade-up" | "slide-left" | "fade";
}) {
  const [ref, inView] = useInView();
  const animations = {
    "fade-up": { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", filter: inView ? "blur(0px)" : "blur(4px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, filter 0.5s ease ${delay}s` },
    "slide-left": { opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)", filter: inView ? "blur(0px)" : "blur(3px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, filter 0.5s ease ${delay}s` },
    "fade": { opacity: inView ? 1 : 0, transition: `opacity 0.5s ease ${delay}s` },
  };
  return <div ref={ref} className={className} style={animations[variant]}>{children}</div>;
}