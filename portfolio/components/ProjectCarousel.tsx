"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

type Project = {
  id: number;
  title: string;
  tags: string[];
  year: string;
  desc: string;
  status: string;
};

const CARD_WIDTH  = 360;
const CARD_HEIGHT = 420;
const CARD_GAP    = 32;
const STEP        = CARD_WIDTH + CARD_GAP;

// Spring: slow enough to feel weighty, fast enough to feel responsive
const SPRING = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 1.2,
};

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const count = projects.length;
  const wrap  = (i: number) => ((i % count) + count) % count;

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered,     setHovered]     = useState<number | null>(null);
  const [isDragging,  setIsDragging]  = useState(false);
  const dragStart  = useRef<{ x: number; time: number } | null>(null);
  const dragDelta  = useRef(0);
  const isAnimating = useRef(false);

  // trackX is the raw horizontal offset of the entire card track.
  // Moving it by -STEP slides everything one card to the left (next card).
  const [trackX, setTrackX] = useState(0);

  const goTo = useCallback((nextIndex: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const wrapped = wrap(nextIndex);
    const delta   = nextIndex - activeIndex; // signed direction
    setTrackX(prev => prev - delta * STEP);
    setActiveIndex(wrapped);
    // unlock after spring settles (~1.1s for these spring values)
    setTimeout(() => { isAnimating.current = false; }, 1100);
  }, [activeIndex, count]);

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Pointer drag
  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, time: Date.now() };
    dragDelta.current = 0;
    setIsDragging(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    dragDelta.current = e.clientX - dragStart.current.x;
    if (Math.abs(dragDelta.current) > 8) setIsDragging(true);
  };
  const onPointerUp = () => {
    if (!dragStart.current) return;
    const dx = dragDelta.current;
    const dt = Date.now() - dragStart.current.time;
    if (Math.abs(dx) > 70 || Math.abs(dx) / dt > 0.4) {
      dx < 0 ? next() : prev();
    }
    dragStart.current = null;
    dragDelta.current = 0;
    setTimeout(() => setIsDragging(false), 50);
  };

  // Render a window of cards: active ±3 so there's always content visible during animation
  const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <div style={{ width: "100%", userSelect: "none" }}>

      {/* Viewport — clips the track and fades edges */}
      <div
        style={{
          position:       "relative",
          height:         `${CARD_HEIGHT}px`,
          overflow:       "hidden",
          perspective:    "1200px",
          perspectiveOrigin: "50% 50%",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          maskImage:       "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* The track: one motion.div that slides left/right */}
        <motion.div
          animate={{ x: trackX }}
          transition={SPRING}
          style={{
            position: "absolute",
            top:      0,
            left:     "50%",
            display:  "flex",
            gap:      `${CARD_GAP}px`,
            // centre the active card: offset by half a card width
            marginLeft: `-${CARD_WIDTH / 2}px`,
          }}
        >
          {visibleOffsets.map((offset) => {
            const projectIndex = wrap(activeIndex + offset);
            const p            = projects[projectIndex];
            const abs          = Math.abs(offset);
            const isActive     = offset === 0;

            // Visual treatment per distance from centre
            const scale   = isActive ? 1    : abs === 1 ? 0.88 : 0.78;
            const opacity = isActive ? 1    : abs === 1 ? 0.60 : 0.30;
            const rotateY = isActive ? 0    : offset > 0 ? -22 * Math.min(abs, 2) : 22 * Math.min(abs, 2);
            const zIndex  = isActive ? 10   : abs === 1 ? 6  : 2;
            const blur    = abs >= 2  ? 1.5 : 0;

            return (
              <motion.div
                key={`offset-${offset}`}
                animate={{
                  scale,
                  opacity,
                  rotateY,
                  filter: `blur(${blur}px)`,
                }}
                transition={SPRING}
                style={{
                  width:          `${CARD_WIDTH}px`,
                  flexShrink:     0,
                  zIndex,
                  cursor:         !isActive ? "pointer" : isDragging ? "grabbing" : "grab",
                  transformStyle: "preserve-3d",
                  // nudge side cards inward slightly so they peek under the active card
                  translateX:     offset > 0 ? -abs * 12 : abs * 12,
                }}
                onClick={() => {
                  if (isDragging || isActive) return;
                  goTo(activeIndex + offset);
                }}
              >
                <div
                  onMouseEnter={() => { if (isActive) setHovered(p.id); }}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background:     isActive && hovered === p.id ? "var(--color-bg-hover)" : "var(--color-bg-secondary)",
                    borderRadius:   "10px",
                    padding:        "clamp(1.25rem, 3vw, 2rem)",
                    border:         isActive ? "1px solid var(--color-accent-primary)" : "1px solid var(--color-border-secondary)",
                    height:         `${CARD_HEIGHT}px`,
                    display:        "flex",
                    flexDirection:  "column",
                    justifyContent: "space-between",
                    transition:     "background 0.25s, border 0.4s, box-shadow 0.25s",
                    boxShadow:      isActive ? "0 8px 40px rgba(199, 91, 42, 0.1)" : "none",
                    boxSizing:      "border-box",
                  }}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.65rem", color: "var(--color-text-minimal)", letterSpacing: "0.1em" }}>
                        {p.year}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-family-mono)", fontSize: "0.6rem", letterSpacing: "0.1em",
                        color:      p.status === "Ongoing" ? "var(--color-accent-secondary)" : "var(--color-accent-primary)",
                        border:     `1px solid ${p.status === "Ongoing" ? "var(--color-accent-secondary)" : "var(--color-accent-primary)"}`,
                        borderRadius: "10px", padding: "0.2rem 0.6rem", textTransform: "uppercase",
                      }}>
                        {p.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily:   "var(--font-inter)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 600,
                      color:        isActive && hovered === p.id ? "var(--color-accent-secondary)" : "var(--color-text-primary)",
                      margin:       "0 0 0.75rem 0", transition: "color 0.25s", letterSpacing: "-0.02em", lineHeight: 1.35,
                    }}>
                      {p.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontFamily: "var(--font-family-body)", fontSize: "clamp(0.8rem, 1.8vw, 0.875rem)",
                      color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0,
                      display: "-webkit-box", WebkitLineClamp: isActive ? 6 : 4,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    } as React.CSSProperties}>
                      {p.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "1.5rem" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: "var(--font-family-mono)", fontSize: "clamp(0.5rem, 1.2vw, 0.58rem)",
                        letterSpacing: "0.08em", color: "var(--color-accent-primary)",
                        background: "rgba(199, 91, 42, 0.06)", borderRadius: "10px", padding: "0.25rem 0.6rem",
                        textTransform: "uppercase",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "2rem" }}>
        <button onClick={prev} style={navBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--color-bg-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >←</button>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width:        activeIndex === i ? "1.5rem" : "0.4rem",
              height:       "0.4rem",
              borderRadius: "10px",
              background:   activeIndex === i ? "var(--color-accent-primary)" : "var(--color-text-subtle)",
              border:       "none", cursor: "pointer", padding: 0,
              transition:   "all 0.3s ease",
            }} />
          ))}
        </div>

        <button onClick={next} style={navBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--color-bg-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >→</button>
      </div>

      {/* Counter */}
      <div style={{
        textAlign: "center", marginTop: "0.75rem",
        fontFamily: "var(--font-family-mono)", fontSize: "0.6rem",
        letterSpacing: "0.12em", color: "var(--color-text-subtle)", textTransform: "uppercase",
      }}>
        {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </div>
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  background:   "transparent",
  border:       "1px solid var(--color-border-secondary)",
  borderRadius: "10px",
  color:        "var(--color-accent-primary)",
  cursor:       "pointer",
  padding:      "0.4rem 0.75rem",
  fontFamily:   "var(--font-family-mono)",
  fontSize:     "0.75rem",
  transition:   "all 0.2s",
};