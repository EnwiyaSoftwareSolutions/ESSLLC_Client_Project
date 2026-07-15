import React from "react"
import Link from "next/link"
import { ArrowRight, Shield, Zap, Users, Lightbulb } from "lucide-react"
import siteConfig from "@/config/site.json"

const { about, brand } = siteConfig

const VALUE_ICONS: Record<string, React.ElementType> = {
  shield: Shield,
  zap: Zap,
  users: Users,
  lightbulb: Lightbulb,
}

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <p
          className="text-xs font-bold uppercase tracking-[0.18em] mb-4"
          style={{ color: "#2563eb" }}
        >
          {about.tag}
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h1 className="text-5xl font-extrabold text-white leading-tight max-w-2xl">
            {about.heading}
          </h1>
          <p
            className="text-lg leading-relaxed max-w-xl lg:text-right"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {about.description}
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {about.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-1">
              <span className="text-4xl font-extrabold" style={{ color: "#2563eb" }}>
                {stat.value}
              </span>
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="flex flex-col gap-4 rounded-2xl p-8"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}
            >
              🎯
            </div>
            <h2 className="text-xl font-bold text-white">Our Mission</h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
              {about.mission}
            </p>
          </div>

          <div
            className="flex flex-col gap-4 rounded-2xl p-8"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}
            >
              🔭
            </div>
            <h2 className="text-xl font-bold text-white">Our Vision</h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
              {about.vision}
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <p
          className="text-xs font-bold uppercase tracking-[0.18em] mb-4"
          style={{ color: "#2563eb" }}
        >
          What Drives Us
        </p>
        <h2 className="text-3xl font-bold text-white mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.values.map((value) => {
            const Icon = VALUE_ICONS[value.icon] ?? Zap
            return (
              <div
                key={value.title}
                className="flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}
                >
                  <Icon className="size-5" style={{ color: "#2563eb" }} strokeWidth={1.6} />
                </div>
                <h3 className="text-base font-bold text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Sister company callout ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(10,22,40,0.6) 100%)",
            border: "1px solid rgba(37,99,235,0.3)",
          }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#2563eb" }}>
              Sister Company
            </p>
            <h3 className="text-xl font-bold text-white">Enwiya Law Firm</h3>
            <p className="text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.62)" }}>
              Need legal counsel alongside your tech? Our sister firm provides full-service legal
              representation — from corporate transactions and estate planning to immigration and civil litigation.
            </p>
          </div>
          <a
            href="https://enwiyalaw.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: "#2563eb" }}
          >
            Visit Enwiya Law <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center gap-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#2563eb" }}>
            Let's Work Together
          </p>
          <h2 className="text-3xl font-bold text-white">
            Ready to start your project?
          </h2>
          <p className="max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
            Tell us what you're building and we'll put together a plan tailored to your goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contactPage"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "#2563eb" }}
            >
              Get in Touch <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
