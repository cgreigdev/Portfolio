"use client";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setErrorMsg("All fields are required.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: focusedField === field ? "transparent" : "transparent",
    border: "none",
    borderBottom: `1px solid ${focusedField === field ? "transparent" : "transparent"}`,
    borderRadius: "10px",
    padding: "0.25rem 0.5rem",
    fontFamily: "var(--font-family-body)",
    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
    color: "var(--color-text-primary)",
    outline: "none",
    transition: "border-color 0.2s ease, background 0.2s ease",
    caretColor: "var(--color-accent-primary)",
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-family-mono)",
    fontSize: "clamp(0.55rem, 1.5vw, 0.62rem)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--color-accent-primary)",
    marginBottom: "0.4rem",
    padding: "0.25rem 0.5rem",
    display: "block",
  };

  const fieldWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: "var(--color-bg-secondary)",
    border: "1px solid var(--color-accent-primary)",
    borderRadius: "10px",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(2rem, 4vw, 3rem) clamp(1rem, 5vw, 2rem)",
        borderTop: "1px solid var(--color-border-secondary)",
        scrollMarginTop: "64px",
      }}
    >
      <div style={{ maxWidth: "min(700px, 90vw)", margin: "0 auto"}}>
        <FadeIn variant="slide-left">
          <h2
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: "0 0 0.75rem 0",
              letterSpacing: "-0.03em",
              textAlign: "center",
            }}
          >
            Contact
          </h2>
        </FadeIn>

        <FadeIn variant="fade" delay={0.15}>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
              color: "var(--color-text-muted)",
              textAlign: "center",
              lineHeight: 1.75,
              marginBottom: "clamp(1rem, 2vw, 2rem)",
            }}
          >
            Feel free to reach out. I’m always open to new opportunities, collaborations, and interesting problems.
          </p>
        </FadeIn>

        <FadeIn variant="fade-up" delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Name row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2rem",
              }}
            >
              <div style={fieldWrapper}>
                <label style={labelStyle}>First Name</label>
                <input
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder=""
                  style={inputStyle("firstName")}
                  autoComplete="given-name"
                />
              </div>
              <div style={fieldWrapper}>
                <label style={labelStyle}>Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder=""
                  style={inputStyle("lastName")}
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Email */}
            <div style={fieldWrapper}>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder=""
                style={inputStyle("email")}
                autoComplete="email"
              />
            </div>

            {/* Message */}
            <div style={fieldWrapper}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder=""
                rows={5}
                style={{
                  ...inputStyle("message"),
                  resize: "vertical",
                  minHeight: "120px",
                  lineHeight: 1.75,
                }}
              />
            </div>

            {/* Status messages */}
            {status === "error" && (
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  color: "#c0392b",
                  margin: 0,
                }}
              >
                {errorMsg}
              </p>
            )}
            {status === "success" && (
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent-secondary)",
                  margin: 0,
                }}
              >
                Message sent! I'll be in touch.
              </p>
            )}

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleSubmit}
                disabled={status === "loading" || status === "success"}
                style={{
                  background: status === "success" ? "var(--color-accent-secondary)" : "transparent",
                  color: status === "success" ? "white" : "var(--color-accent-primary)",
                  border: `1px solid ${status === "success" ? "var(--color-accent-secondary)" : "var(--color-accent-primary)"}`,
                  borderRadius: "10px",
                  padding: "0.65rem 1rem",
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "clamp(0.65rem, 1.5vw, 0.7rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  cursor: status === "loading" || status === "success" ? "default" : "pointer",
                  transition: "all 0.2s",
                  opacity: status === "loading" ? 0.6 : 1,
                }}
                onMouseEnter={e => {
                  if (status === "idle" || status === "error") {
                    (e.target as HTMLButtonElement).style.background = "var(--color-accent-primary)";
                    (e.target as HTMLButtonElement).style.color = "white";
                  }
                }}
                onMouseLeave={e => {
                  if (status === "idle" || status === "error") {
                    (e.target as HTMLButtonElement).style.background = "transparent";
                    (e.target as HTMLButtonElement).style.color = "var(--color-accent-primary)";
                  }
                }}
              >
                {status === "loading" ? "Sending..." : status === "success" ? "Sent ✓" : "Send Message"}
              </button>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}