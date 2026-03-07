"use client";
import { useState, useEffect, useRef } from "react";
import GooeyNav from "@/components/GooeyNav";
import GradualBlur from "@/components/GradualBlur";
// ============================================================
//  EDIT ALL YOUR CONTENT HERE
// ============================================================
const CONTENT = {
  name: "Callum Greig",
  role: "Mechatronics Engineer",
  tagline: ["Hi, I’m Callum. I enjoy designing innovative engineering solutions that turn complex problems into practical systems — spanning structural design, manufacturing, automation, and custom-built hardware and software.",
    " I’m driven by curiosity and a love of tinkering, with a focus on solutions that combine good engineering, thoughtful design, and long-term sustainability.",
  ],
    about: [
    "I'm a mechatronics engineer who loves building things that move, sense, and think. My work sits at the crossroads of mechanical design, electronics, and intelligent control — from robotic arms to battery management systems.",
    "I'm drawn to problems where hardware and software are equally hard — where getting the algorithm right matters just as much as getting the circuit right.",
  ],
  skills: [
    { label: "Dev Ops", pct: 60 },
    { label: "Embedded Systems", pct: 70 },
    { label: "Automation Design", pct: 80 },
    { label: "PCB Design", pct: 50 },
    { label: "Project Management", pct: 50 },
    { label: "CAD Modelling", pct: 90 },
    { label: "Sales Engineering", pct: 60 },
    { label: "Systems Engineering", pct: 60 },
    { label: "FEA, CFD, and thermal analysis", pct: 60 },
    { label: "Composite Material Analysis", pct: 80 },
  ],
  sections: {
    about: {
      label: "01 — ABOUT",
      title: "About Me",
    },
    projects: {
      label: "02 — PROJECTS",
      title: "Main Projects",
    },
    cv: {
      label: "03 — CV",
      title: "Experience & Skills",
      cta: "Want the full picture?",
      ctaButton: "Download CV ↓",
    },
  },
  footer: {
    copyright: "© 2026 Callum Greig | All rights reserved.",
    socialLinks: [
      { label: "LinkedIn", url: "https://linkedin.com/in/callumgreig" },
      { label: "Email", url: "mailto:callumgreig20@gmail.com" },
    ],
  },
  social: {
    linkedin: "https://linkedin.com/in/callumgreig",
    email: "callumgreig20@gmail.com",
  },
  cvUrl: "/CV - Callum Greig.pdf", // drop your CV in the /public folder and link it here
};
// update with your own items
const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "CV", href: "#cv" },
];

const PROJECTS = [
  {
    id: 1,
    title: "Auto Tool Changing CNC Macine",
    tags: ["Embedded Systems", "PCB Design", "Javascript", "G-Code", "DFMA", "Project Management"],
    year: "2024-2026",
    desc: "Designed and implemented a CNC control architecture integrating motion drives, power systems, sensors, machine I/O, tooling automation, integrated safety systems, and operational manuals/SOP. Increased manufacturing efficiency by 200% and reduced manual intervention by 80%.",
    status: "Complete",
  },
  {
    id: 2,
    title: "Flexural Material Testing Machine",
    tags: ["Embedded Systems", "Python", "Control Systems", "Data Analysis", "Project Management", "Composite Material Testing"],
    year: "2023-2024",
    desc: "Designed a semi-automated three-point flexural testing machine with embedded control, load cell and displacement instrumentation, signal conditioning, and stress–strain analysis for composites to ASTM D790. Enabled precise material characterisation with 0.5% accuracy, reducing testing time by 60% and increasing data reliability.",
    status: "Complete",
  },
  {
    id: 3,
    title: "Full Year Project – Non-Destructive Testing (NDT) of Composite Structures",
    tags: ["Phased-Aray Ultrasonic NDT", "MATLAB", "Composite Material Analysis", "Airframe Structural Testing", "Data Analysis"],
    year: "2023",
    desc: "NDT analysis of MKII-A Composite Airframe, evaluate validity of NDT methods for detecting CFRP long-term performance, airframe load testing, and evaluate real-time diagnosis methods of airframe structural health.",
    status: "Complete",
  },
  {
    id: 4,
    title: "Hazardous Chemical Storage Temperature Monitoring System",
    tags: ["Embedded Electronics", "Time-series Data Systems", "Networking and IoT", "Systems Engineering", "C/C++", "Python", "SQL", "Bash/Shell"],
    year: "2024",
    desc: "Designed and deployed an ESP32-based temperature monitoring system for hazardous chemical storage, integrating IoT telemetry with time-series data logging. The solution provides continuous 24/7 monitoring, automated historical records, and early warning of temperature deviations, improving monitoring reliability and supporting safer storage of temperature-sensitive hazardous substances.",
    status: "Complete",
  },
  {
    id: 5,
    title: "Manufacturing Data & Product Database System",
    tags: ["Database Design", "SQL", "Python", "Manufacturing Systems", "Process Optimisation", "Data Analysis", "Engineering Automation"],
    year: "2024",
    desc: "Developed an internal SQL-based database for pultruded composite products integrating production setup sheets, troubleshooting records, and engineering data. Implemented tools for manufacturing issue tracking, resin formulation management, and pricing calculators for structural assemblies, enabling improved process optimisation and more accurate project costing.",
    status: "Ongoing",
  },
  {
    id: 6,
    title: "Parametric Surface Modelling for Manufacturing Tooling",
    tags: ["Parametric CAD", "Surface Modelling", "Manufacturing Engineering", "Process Optimisation", "Fusion 360", "3D Printing", "Rapid Prototyping"],
    year: "2025",
    desc: "Developed parametric surface models for specialised tooling used in continuous composite manufacturing. Rapid prototypes were produced using 3D printing with engineering filaments to validate forming behaviour and enable fast design iteration in volatile chemical environments. The resulting tooling designs reduced forming-related machine downtime and improved manufacturing stability.",
    status: "Ongoing",
  },
];

const PERSONAL_PROJECTS = [
  {
    id: 1,
    title: "3D Printed TPU Discs – Aerodynamic Design Iteration",
    tags: ["3D Printing", "Rapid Prototyping", "Aerodynamics", "Iterative Design", "CAD Modelling", "Material Testing", "TPU"],
    year: "2023",
    desc: "Designed and 3D printed flexible TPU discs, applying iterative CAD modelling and aerodynamic analysis to optimise flight performance. Prototypes were tested and refined through successive design cycles, improving stability, distance, and flight consistency while exploring material behaviour under dynamic conditions.",
    status: "Complete",
  },
  {
    id: 2,
    title: "Homelab Infrastructure & Systems Experimentation",
    tags: ["Homelab", "Linux Systems", "Virtualisation", "Networking", "Docker", "Automation", "Infrastructure Management"],
    year: "2024–2026",
    desc: "Built and maintained a personal homelab environment for systems learning, software experimentation, and infrastructure testing. The setup includes virtualisation platforms, containerised services, and networked applications used to explore server management, deployment workflows, and system reliability concepts. Focus was placed on practical engineering learning, platform stability, and experimenting with modern infrastructure tooling.",
    status: "Ongoing",
  },
  {
    id: 3,
    title: "Multi-Protocol Embedded Universal Control Device",
    tags: ["Embedded Systems", "Firmware Architecture", "Low-Power Design", "Wireless Communication", "NFC", "Bluetooth", "WiFi", "RF Signal Processing", "Sensor Integration", "C/C++"],
    year: "2025-2026",
    desc: "Developed a handheld embedded device platform supporting multiple communication and sensing technologies including infrared, radio frequency, NFC, Bluetooth, and WiFi experimentation. The project also explored low-power firmware architecture, signal acquisition and reproduction workflows, and integration of time-of-flight and motion sensing components for physical measurement and interaction research. Emphasis was placed on modular firmware design, energy efficiency, and hardware interface prototyping.",
    status: "Ongoing",
  },
  {
    id: 4,
    title: "Creative Worldbuilding, Campaign Systems, and Knowledge Database Design",
    tags: ["Systems Design", "Worldbuilding", "Knowledge Management", "Digital Organisation", "Map Design", "Creative Engineering"],
    year: "2026",
    desc: "Developed an integrated creative design environment supporting tabletop campaign development for a Dungeons & Dragons role-playing framework. The project combines structured narrative worldbuilding, custom environmental map design, and automated note organisation using an Obsidian-based knowledge database system. The vault functions as a decision support and planning assistant for campaign development, enabling hierarchical story tracking, character and event relationships, and design iteration. The work demonstrates application of systems thinking to creative domain modelling.",
    status: "Ongoing",
  },
  {
    id: 5,
    title: "Gravity Fed Hydroponic Cultivation System Design",
    tags: ["CAD Design", "3D Printing", "Agricultural Engineering", "Environmental Measurement", "Prototyping", "Sustainable Systems"],
    year: "2023",
    desc: "Designed and prototyped a gravity-fed hydroponic growing system for chilli pepper cultivation, incorporating 3D printed self-wicking internal cores to regulate nutrient distribution. The project involved iterative CAD modelling, physical prototyping, and testing of nutrient solution properties including electrical conductivity and pH balance to optimise plant health and growth conditions. Focus was placed on reliable passive water delivery, structural manufacturability, and sustainable cultivation principles.",
    status: "Complete",
  }, 
  {
    id: 6,
    title: "Custom PC System Designs and Assembly",
    tags: ["Hardware Engineering", "System Integration", "Thermal Management", "Component Optimisation"],
    year: "2020–2026",
    desc: "Designed and assembled custom personal computing systems with focus on component compatibility, thermal performance, and workload optimisation. The work involved selecting hardware configurations based on intended computational and operational requirements while ensuring system stability and efficiency.",
    status: "Ongoing",
  }
];

const CV_ITEMS = [
  {
    type: "Education",
    title: "Bachelor of Engineering (Honours) in Mechatronics",
    org: "University of Canterbury",
    period: "2019 – 2023",
  },
  {
    type: "Experience",
    title: "Mechatronics Design Engineer",
    org: "Gracol Composites LTD",
    period: "Nov 2023 – present",
    detail: "Developed automated hardware testing rigs using Python & LabVIEW",
  },
  {
    type: "Experience",
    title: "Workshop Engineer Trainee",
    org: "Reed Industrial LTD",
    period: "Nov 2021 – Feb 2022",
    detail: "Contributed to soft robotics actuator research; 1 co-authored paper",
  },
  {
  type: "Experience",
  title: "NASA Space Camp Participant",
  org: "NASA",
  period: "2018",
  detail: "Participated in immersive STEM and aerospace engineering activities, strengthening early interest in engineering and problem solving."
  },
  {
    type: "Skills",
    title: "CAD and Analysis",
    org: "",
    period: "",
    detail: "Parametric CAD · Surface Modelling · SolidWorks · PCB Design · Fusion 360 · FEA · CFD · Thermal Analysis",
  },
  {
    type: "Skills",
    title: "Programming & Simulation",
    org: "",
    period: "",
    detail: "Python · C/C++ · MATLAB · Simulink · Comsol · ANSYS",
  },
  {
    type: "Skills",
    title: "Embedded & Control Systems",
    org: "",
    period: "",
    detail: "PLC Ladder Logic · G-Code · Microcontrollers",
  },
  {
    type: "Skills",
    title: "Systems & Software Tools",
    org: "",
    period: "",
    detail: "Git · Bash · SQL · Docker · VM Management (Proxmox) · YAML",
  },
  {
    type: "Skills",
    title: "Web & Scripting",
    org: "",
    period: "",
    detail: "JavaScript · HTML · VBA",
  },
  {
    type: "Skills",
    title: "Sales & Systems Engineering",
    org: "",
    period: "",
    detail: "Pricing & Structural Calculators · Quoting · Project Management · Financial Planning",
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

function FadeIn({ children, delay = 0.5, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav({ active, onNav, scrollRef }: { active: string; onNav: (section: string) => void; scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const [scrolled, setScrolled] = useState(false);
  const initialIndex = items.findIndex(item => item.href === `#${active}`);
  
  useEffect(() => {
    const fn = () => setScrolled((scrollRef.current?.scrollTop ?? 0) > 40);
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", fn);
      return () => scrollEl.removeEventListener("scroll", fn);
    }
  }, [scrollRef]);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2.5rem",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "var(--color-bg-overlay)" : "var(--color-bg-primary)",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--color-border-primary)" : "none",
      transition: "all 0.4s ease",
    }}>
      <span style={{
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.8rem",
        letterSpacing: "0.15em",
        color: "var(--color-text-primary)",
        opacity: 0.9,
      }}>
        C<span style={{ color: "var(--color-accent-primary)" }}>.</span>Greig
      </span>
      <div style={{ height: "60px", position: "relative" }}>
        <GooeyNav
          items={items}
          particleCount={10}
          particleDistances={[50, 10]}
          particleR={50}
          initialActiveIndex={initialIndex >= 0 ? initialIndex : 0}
          animationTime={300}
          timeVariance={700}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>
    </nav>
  );
}

function Hero({ onNav, onDownloadCV }: { onNav: (section: string) => void; onDownloadCV: () => void }) {
  const [typed, setTyped] = useState("");
  const full = CONTENT.role;
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

      <div style={{ maxWidth: "1200px", position: "relative" }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid var(--color-accent-primary)",
            boxShadow: "0 0 40px rgba(255, 208, 0, 0.2)",
            position: "absolute",
            top: 0,
            right: "-340px",
          }}>
            <img
              src="/profile.jpg"
              alt="Callum Greig - Profile Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <h1 style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "var(--font-size-hero-name)",
            fontWeight: 800,
            lineHeight: 1.0,
            color: "var(--color-accent-primary)",
            margin: "0 0 1rem 0",
            letterSpacing: "-0.03em",
          }}>
            {CONTENT.name}
          </h1>
        </div>

        <div style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "var(--font-size-hero-title)",
          fontWeight: 300,
          color: "var(--color-text-secondary)",
          marginBottom: "2.5rem",
          minHeight: "1.2em",
          letterSpacing: "-0.02em",
        }}>
          {typed}<span style={{ color: "var(--color-accent-primary)", animation: "blink 1s step-end infinite" }}>_</span>
        </div>

        <p style={{
          fontFamily: "var(--font-family-body)",
          fontSize: "1.05rem",
          color: "var(--color-text-muted)",
          maxWidth: "800px",
          lineHeight: 1.75,
          marginBottom: "3rem",
        }}>
          {CONTENT.tagline.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => onNav("projects")}
            style={{
              background: "var(--color-accent-primary)", color: "white",
              border: "1px solid var(--color-accent-primary)",
              padding: "0.85rem 2rem",
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-secondary)"; (e.target as HTMLButtonElement).style.borderColor = "var(--color-accent-secondary)"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-primary)"; (e.target as HTMLButtonElement).style.borderColor = "var(--color-accent-primary)"; }}
          >
            View Projects
          </button>
          <button
            onClick={onDownloadCV}
            style={{
              background: "var(--color-accent-primary)", color: "white",
              border: "1px solid var(--color-accent-primary)",
              cursor: "pointer",
              padding: "0.85rem 2rem",
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-secondary)"; (e.target as HTMLButtonElement).style.borderColor = "var(--color-accent-secondary)"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-primary)"; (e.target as HTMLButtonElement).style.borderColor = "var(--color-accent-primary)"; }}
          >
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "8rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn>
        <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-accent-primary)", marginBottom: "1rem" }}>
          {`// ${CONTENT.sections.about.label}`}
        </div>
        <h2 style={{ fontFamily: "var(--font-family-display)", fontSize: "var(--font-size-section-heading)", fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 3rem 0", letterSpacing: "-0.03em" }}>
          {CONTENT.sections.about.title}
        </h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <FadeIn delay={0.1}>
          {CONTENT.about.map((paragraph, i) => (
            <p key={i} style={{ fontFamily: "var(--font-family-body)", fontSize: "1.05rem", color: "var(--color-text-secondary)", lineHeight: 1.85, marginBottom: i === CONTENT.about.length - 1 ? "2rem" : "1.5rem" }}>
              {paragraph}
            </p>
          ))}
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {CONTENT.skills.map(({ label, pct }, i) => (
              <div key={label}>
                <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--color-text-extra-faint)", textTransform: "uppercase" }}>{label}</span>
                <SkillDots pct={pct} delay={i * 0.08} />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SkillDots({ pct, delay }: { pct: number; delay: number }) {
  const [ref, inView] = useInView();
  const filledDots = Math.round(pct / 10);
  const totalDots = 10;

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "0.25rem", marginTop: "0.6rem", maxWidth: "100px" }}>
      {Array.from({ length: totalDots }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "50%",
            background: i < filledDots ? "var(--color-accent-primary)" : "rgba(255,255,255,0.1)",
            transition: `background 0.4s ease ${delay + (i * 0.05)}s`,
            opacity: inView ? 1 : 0.3,
          }}
        />
      ))}
    </div>
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
  const [activeTab, setActiveTab] = useState("Work");

  const projectTabs = ["Work", "Personal"];
  const currentProjects = activeTab === "Work" ? PROJECTS : PERSONAL_PROJECTS;

  return (
    <section id="projects" style={{ padding: "8rem 2.5rem", background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border-secondary)", borderBottom: "1px solid var(--color-border-secondary)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-accent-primary)", marginBottom: "1rem" }}>
            {`// ${CONTENT.sections.projects.label}`}
          </div>
          <h2 style={{ fontFamily: "var(--font-family-display)", fontSize: "var(--font-size-section-heading)", fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 3.5rem 0", letterSpacing: "-0.03em" }}>
            {CONTENT.sections.projects.title}
          </h2>
        </FadeIn>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {projectTabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              background: activeTab === t ? "var(--color-accent-primary)" : "transparent",
              color: activeTab === t ? "white" : "var(--color-text-muted)",
              border: "1px solid rgba(99, 96, 96, 0.56)",
              cursor: "pointer",
              padding: "0.6rem 1.5rem",
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (activeTab !== t) { (e.target as HTMLButtonElement).style.borderColor = "var(--color-border-accent-active)"; (e.target as HTMLButtonElement).style.color = "var(--color-accent-primary)"; } }}
              onMouseLeave={e => { if (activeTab !== t) { (e.target as HTMLButtonElement).style.borderColor = "rgba(99, 96, 96, 0.56)"; (e.target as HTMLButtonElement).style.color = "var(--color-text-muted)"; } }}
            >{t}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5px", background: "var(--color-border-primary)" }}>
          {currentProjects.map((p, i) => (
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
                    <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.65rem", color: "var(--color-text-minimal)", letterSpacing: "0.1em" }}>{p.year}</span>
                    <span style={{
                      fontFamily: "var(--font-family-mono)", fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: p.status === "In Progress" ? "var(--color-accent-status)" : "var(--color-accent-primary)",
                      border: `1px solid ${p.status === "In Progress" ? "rgba(255,209,102,0.3)" : "var(--color-border-accent)"}`,
                      padding: "0.2rem 0.6rem",
                      textTransform: "uppercase",
                    }}>{p.status}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-family-display)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: hovered === p.id ? "var(--color-accent-primary)" : "var(--color-text-primary)",
                    margin: "0 0 0.75rem 0",
                    transition: "color 0.25s",
                    letterSpacing: "-0.02em",
                  }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-family-body)", fontSize: "0.88rem", color: "var(--color-text-subtle)", lineHeight: 1.7, margin: "0 0 1.5rem 0" }}>{p.desc}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      color: "var(--color-accent-primary)",
                      background: "rgba(199, 91, 42, 0.06)",
                      padding: "0.25rem 0.65rem",
                      textTransform: "uppercase",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CV({ onDownloadCV }: { onDownloadCV: () => void }) {
  const types = [...new Set(CV_ITEMS.map(i => i.type))];
  const [activeType, setActiveType] = useState("Education");

  return (
    <section id="cv" style={{ padding: "8rem 2.5rem 4rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--color-accent-primary)", marginBottom: "1rem" }}>
            {`// ${CONTENT.sections.cv.label}`}
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 3rem 0", letterSpacing: "-0.03em" }}>
            {CONTENT.sections.cv.title}
          </h2>
        </FadeIn>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setActiveType(t)} style={{
              background: activeType === t ? "var(--color-accent-primary)" : "transparent",
              color: activeType === t ? "white" : "var(--color-text-muted)",
              border: "1px solid rgba(99, 96, 96, 0.56)",
              cursor: "pointer",
              padding: "0.6rem 1.5rem",
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (activeType !== t) { (e.target as HTMLButtonElement).style.borderColor = "var(--color-border-accent-active)"; (e.target as HTMLButtonElement).style.color = "var(--color-accent-primary)"; } }}
              onMouseLeave={e => { if (activeType !== t) { (e.target as HTMLButtonElement).style.borderColor = "rgba(99, 96, 96, 0.56)"; (e.target as HTMLButtonElement).style.color = "var(--color-text-muted)"; } }}
            >{t}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0", minHeight: "200px" }}>
          {CV_ITEMS.filter(item => item.type === activeType).map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                padding: "2rem 0",
                borderBottom: "1px solid var(--color-border-secondary)",
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr",
                gap: "2rem",
                alignItems: "start",
              }}>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.3rem" }}>{item.title}</div>
                  {item.org && <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--color-accent-primary)", textTransform: "uppercase" }}>{item.org}</div>}
                </div>
                <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>{item.detail}</div>
                {item.period && <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--color-text-minimal)", textAlign: "right" }}>{item.period}</div>}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid var(--color-border-primary)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.3rem" }}>{CONTENT.sections.cv.cta}</div>
              <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.9rem", color: "var(--color-text-faint)" }}>Download my complete CV as a PDF.</div>
            </div>
            <button
              onClick={onDownloadCV}
              style={{
              background: "var(--color-accent-primary)", color: "white",
              border: "1px solid var(--color-accent-primary)",
              cursor: "pointer",
              padding: "0.85rem 2rem",
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              fontWeight: 600,
              textTransform: "uppercase",
              transition: "all 0.2s",
              marginTop: "1rem",
            }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-secondary)"; (e.target as HTMLButtonElement).style.borderColor = "var(--color-accent-secondary)"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "var(--color-accent-primary)"; (e.target as HTMLButtonElement).style.borderColor = "var(--color-accent-primary)"; }}
            >
              {CONTENT.sections.cv.ctaButton}
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
      padding: "1rem 5rem",
      borderTop: "1px solid var(--color-border-primary)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
    }}>
      <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--color-text-tiny)" }}>
        {CONTENT.footer.copyright}
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {CONTENT.footer.socialLinks.map(link => (
          <a key={link.label} href={link.url} style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "var(--color-text-extra-faint)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "var(--color-accent-primary)"}
            onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "var(--color-text-extra-faint)"}
          >{link.label}</a>
        ))}
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&family=Roboto:wght@300;400;500&family=Roboto+Mono:wght@400;600&display=swap";
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

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = CONTENT.cvUrl;
    link.download = 'CV - Callum Greig.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div ref={scrollRef} style={{ height: "100vh", overflowY: "auto", padding: "0", position: "relative", background: "var(--color-bg-primary)" }}>
        <Nav active={activeSection} onNav={scrollTo} scrollRef={scrollRef} />
        <Hero onNav={scrollTo} onDownloadCV={downloadCV} />
        <About />
        <Projects />
        <CV onDownloadCV={downloadCV} />
        <Footer />
        <div style={{ height: "10rem" }} />
      </div>
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
      />
    </div>
  );
}