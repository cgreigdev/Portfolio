"use client";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Projects", "CV"];

const PROJECTS = [
  {
    id: 1,
    title: "Autonomous Robotic Arm",
    tags: ["Robotics", "ROS", "Python"],
    year: "2024",
    desc: "6-DOF robotic arm with computer vision pick-and-place, achieving ±0.5mm positional accuracy using inverse kinematics and OpenCV.",
    status: "Complete",
  },
  {
    id: 2,
    title: "EV Battery Management System",
    tags: ["Embedded C", "CAN Bus", "PCB Design"],
    year: "2024",
    desc: "Custom BMS for a 48V lithium pack with real-time cell balancing, thermal monitoring, and CAN communication to vehicle ECU.",
    status: "Complete",
  },
  {
    id: 3,
    title: "Exoskeleton Actuator Control",
    tags: ["Control Systems", "MATLAB", "Simulink"],
    year: "2023",
    desc: "PID + feedforward controller for lower-limb exoskeleton joint, reducing energy consumption by 23% over baseline.",
    status: "Complete",
  },
  {
    id: 4,
    title: "IoT Predictive Maintenance",
    tags: ["MQTT", "TensorFlow", "Edge AI"],
    year: "2023",
    desc: "Vibration-based anomaly detection deployed on STM32 microcontroller, predicting bearing failure 72 hours in advance.",
    status: "Complete",
  },
  {
    id: 5,
    title: "Soft Pneumatic Gripper",
    tags: ["FEA", "3D Printing", "Fluid Mechanics"],
    year: "2022",
    desc: "Silicone-cast soft actuator gripper for fragile object handling, with FEA-validated inflation model and force sensing.",
    status: "Complete",
  },
  {
    id: 6,
    title: "Drone Swarm Coordinator",
    tags: ["ROS2", "C++", "SLAM"],
    year: "2025",
    desc: "Decentralised multi-UAV coordination system using consensus algorithms for indoor mapping without GPS.",
    status: "In Progress",
  },
];

const CV_ITEMS = [
  {
    type: "Education",
    title: "B.Eng Mechatronics Engineering",
    org: "University of Canterbury",
    period: "2020 – 2024",
    detail: "First Class Honours · GPA 8.7/9",
  },
  {
    type: "Experience",
    title: "Robotics Engineering Intern",
    org: "Optimal Workshop",
    period: "Nov 2023 – Feb 2024",
    detail: "Developed automated hardware testing rigs using Python & LabVIEW",
  },
  {
    type: "Experience",
    title: "Research Assistant",
    org: "UC Robotics Lab",
    period: "Mar 2023 – Oct 2023",
    detail: "Contributed to soft robotics actuator research; 1 co-authored paper",
  },
  {
    type: "Skills",
    title: "Hardware",
    org: "",
    period: "",
    detail: "STM32 · Arduino · Raspberry Pi · PCB Design (KiCad) · SolidWorks · FEA",
  },
  {
    type: "Skills",
    title: "Software",
    org: "",
    period: "",
    detail: "Python · C/C++ · ROS/ROS2 · MATLAB · Simulink · TensorFlow · Git",
  },
];

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

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav({ active, onNav }: { active: string; onNav: (section: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2.5rem",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "var(--color-bg-overlay)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--color-border-primary)" : "none",
      transition: "all 0.4s ease",
    }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.8rem",
        letterSpacing: "0.15em",
        color: "var(--color-text-primary)",
        opacity: 0.9,
      }}>
        C<span style={{ color: "var(--color-accent-primary)" }}>.</span>G
      </span>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => onNav(link.toLowerCase())}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              color: active === link.toLowerCase() ? "var(--color-accent-primary)" : "var(--color-text-extra-faint)",
              transition: "color 0.2s",
              textTransform: "uppercase",
              padding: 0,
            }}
            onMouseEnter={e => { if (active !== link.toLowerCase()) (e.target as HTMLButtonElement).style.color = "var(--color-text-subtle)"; }}
            onMouseLeave={e => { if (active !== link.toLowerCase()) (e.target as HTMLButtonElement).style.color = "var(--color-text-extra-faint)"; }}
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Hero({ onNav }: { onNav: (section: string) => void }) {
  const [typed, setTyped] = useState("");
  const full = "Mechatronics Engineer";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(var(--color-grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />
      {/* glow */}
      <div style={{
        position: "absolute", top: "20%", left: "60%",
        width: "480px", height: "480px",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--color-glow) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", position: "relative" }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          color: "#C75B2A",
          marginBottom: "1.5rem",
          opacity: 0.9,
        }}>
          {"// hello, I'm"}
        </div>
        <h1 style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 800,
          lineHeight: 1.0,
          color: "var(--color-accent-primary)",
          margin: "0 0 1rem 0",
          letterSpacing: "-0.03em",
        }}>
          Callum Greig
        </h1>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(1.5rem, 4vw, 3.2rem)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.35)",
          marginBottom: "2.5rem",
          minHeight: "1.2em",
          letterSpacing: "-0.02em",
        }}>
          {typed}<span style={{ color: "var(--color-accent-primary)", animation: "blink 1s step-end infinite" }}>_</span>
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1.05rem",
          color: "var(--color-text-muted)",
          maxWidth: "520px",
          lineHeight: 1.75,
          marginBottom: "3rem",
        }}>
          Building intelligent machines at the intersection of hardware, software, and control systems.
          Based in Christchurch, NZ.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => onNav("projects")}
            style={{
              background: "var(--color-accent-primary)", color: "#08080a",
              border: "none", cursor: "pointer",
              padding: "0.85rem 2rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#ffffff"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-primary)"; }}
          >
            View Projects →
          </button>
          <button
            onClick={() => onNav("cv")}
            style={{
              background: "transparent",
              color: "var(--color-text-extra-faint)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              padding: "0.85rem 2rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "var(--color-border-accent-active)"; (e.target as HTMLButtonElement).style.color = "var(--color-accent-primary)"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.target as HTMLButtonElement).style.color = "var(--color-text-extra-faint)"; }}
          >
            Download CV
          </button>
        </div>
      </div>

      {/* scroll hint */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "2.5rem",
        display: "flex", alignItems: "center", gap: "0.75rem",
      }}>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, var(--color-accent-primary))" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--color-text-minimal)", textTransform: "uppercase" }}>Scroll</span>
      </div>
    </section>
  );
}

function About() {
  const skills = [
    { label: "Robotics & ROS", pct: 90 },
    { label: "Embedded Systems", pct: 85 },
    { label: "Control Theory", pct: 82 },
    { label: "PCB Design", pct: 75 },
    { label: "Machine Learning", pct: 68 },
    { label: "Mechanical CAD", pct: 80 },
  ];

  return (
    <section id="about" style={{ padding: "8rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-accent-primary)", marginBottom: "1rem" }}>
          {"// 01 — about"}
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", margin: "0 0 3rem 0", letterSpacing: "-0.03em" }}>
          Who I Am
        </h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            I'm a mechatronics engineer who loves building things that move, sense, and think. My work sits at the crossroads of mechanical design, electronics, and intelligent control — from robotic arms to battery management systems.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: "2rem" }}>
            I'm drawn to problems where hardware and software are equally hard — where getting the algorithm right matters just as much as getting the circuit right.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[["6+", "Projects"], ["2", "Publications"], ["3", "Internships"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.2rem", fontWeight: 800, color: "var(--color-accent-primary)" }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--color-text-tiny)", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {skills.map(({ label, pct }, i) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--color-text-extra-faint)", textTransform: "uppercase" }}>{label}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "var(--color-accent-primary)", opacity: 0.6 }}>{pct}%</span>
                </div>
                <div style={{ height: "2px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
                  <SkillBar pct={pct} delay={i * 0.08} />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SkillBar({ pct, delay }: { pct: number; delay: number }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      height: "100%",
      width: inView ? `${pct}%` : "0%",
      background: "linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary))",
      transition: `width 1s ease ${delay + 0.2}s`,
      borderRadius: "2px",
    }} />
  );
}

function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" style={{ padding: "8rem 2.5rem", background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border-secondary)", borderBottom: "1px solid var(--color-border-secondary)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-accent-primary)", marginBottom: "1rem" }}>
            {"// 02 — projects"}
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", margin: "0 0 3.5rem 0", letterSpacing: "-0.03em" }}>
            Selected Work
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5px", background: "var(--color-border-primary)" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.07}>
              <div
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === p.id ? "var(--color-bg-hover)" : "var(--color-bg-primary)",
                  padding: "2.2rem",
                  cursor: "pointer",
                  transition: "background 0.25s",
                  position: "relative",
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "var(--color-text-minimal)", letterSpacing: "0.1em" }}>{p.year}</span>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: p.status === "In Progress" ? "var(--color-accent-status)" : "var(--color-accent-primary)",
                      border: `1px solid ${p.status === "In Progress" ? "rgba(255,209,102,0.3)" : "var(--color-border-accent)"}`,
                      padding: "0.2rem 0.6rem",
                      textTransform: "uppercase",
                    }}>{p.status}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: hovered === p.id ? "var(--color-accent-primary)" : "var(--color-text-primary)",
                    margin: "0 0 0.75rem 0",
                    transition: "color 0.25s",
                    letterSpacing: "-0.02em",
                  }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "var(--color-text-subtle)", lineHeight: 1.7, margin: "0 0 1.5rem 0" }}>{p.desc}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      color: "var(--color-accent-primary)",
                      background: "rgba(199, 91, 42, 0.06)",
                      padding: "0.25rem 0.65rem",
                      textTransform: "uppercase",
                    }}>{t}</span>
                  ))}
                </div>
                {hovered === p.id && (
                  <div style={{
                    position: "absolute", bottom: "2.2rem", right: "2.2rem",
                    fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                    color: "var(--color-accent-primary)", letterSpacing: "0.1em",
                  }}>View →</div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CV() {
  const types = [...new Set(CV_ITEMS.map(i => i.type))];
  const [activeType, setActiveType] = useState("Education");

  return (
    <section id="cv" style={{ padding: "8rem 2.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-accent-primary)", marginBottom: "1rem" }}>
            {"// 03 — cv"}
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", margin: "0 0 3rem 0", letterSpacing: "-0.03em" }}>
            Experience & Skills
          </h2>
        </FadeIn>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setActiveType(t)} style={{
              background: activeType === t ? "var(--color-accent-primary)" : "transparent",
              color: activeType === t ? "#08080a" : "var(--color-text-subtle)",
              border: `1px solid ${activeType === t ? "var(--color-accent-primary)" : "var(--color-border-tertiary)"}`,
              cursor: "pointer",
              padding: "0.6rem 1.5rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: activeType === t ? 700 : 400,
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {CV_ITEMS.filter(item => item.type === activeType).map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                padding: "2rem 0",
                borderBottom: "1px solid var(--color-border-primary)",
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr",
                gap: "2rem",
                alignItems: "start",
              }}>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>{item.title}</div>
                  {item.org && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--color-accent-primary)", textTransform: "uppercase" }}>{item.org}</div>}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>{item.detail}</div>
                {item.period && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--color-text-minimal)", textAlign: "right" }}>{item.period}</div>}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid var(--color-border-primary)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>Want the full picture?</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "var(--color-text-faint)" }}>Download my complete CV as a PDF.</div>
            </div>
            <button style={{
              background: "transparent",
              color: "var(--color-accent-primary)",
              border: "1px solid var(--color-border-accent-hover)",
              cursor: "pointer",
              padding: "0.85rem 2rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s",
              marginTop: "1rem",
            }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-primary)"; (e.target as HTMLButtonElement).style.color = "#08080a"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "transparent"; (e.target as HTMLButtonElement).style.color = "var(--color-accent-primary)"; }}
            >
              Download CV ↓
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "3rem 2.5rem",
      borderTop: "1px solid var(--color-border-primary)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--color-text-tiny)" }}>
        © 2025 Your Name
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {["GitHub", "LinkedIn", "Email"].map(link => (
          <a key={link} href="#" style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "var(--color-text-extra-faint)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "var(--color-accent-primary)"}
            onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "var(--color-text-extra-faint)"}
          >{link}</a>
        ))}
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link2);

    const style = document.createElement("style");
    style.textContent = `
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: var(--color-bg-primary); }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--color-bg-primary); }
      ::-webkit-scrollbar-thumb { background: var(--color-scrollbar); border-radius: 2px; }
    `;
    document.head.appendChild(style);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    ["home", "about", "projects", "cv"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id === "home" ? "home" : id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "var(--color-bg-primary)", minHeight: "100vh", color: "#fff" }}>
      <Nav active={activeSection} onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <About />
      <Projects />
      <CV />
      <Footer />
    </div>
  );
}