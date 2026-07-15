"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Globe, Smartphone, Cloud, Brain, Code2 } from 'lucide-react'
import siteConfig from '@/config/site.json'

const { portfolio } = siteConfig

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Web Development": Globe,
  "Mobile": Smartphone,
  "Cloud & DevOps": Cloud,
  "AI & Automation": Brain,
}

const CATEGORIES = ["All", "Web Development", "Mobile", "Cloud & DevOps", "AI & Automation"]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = portfolio.projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  )

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: "#2563eb" }}>
          Our Work
        </p>
        <h1 className="text-5xl font-extrabold text-white leading-tight mb-5">
          {portfolio.heading}
        </h1>
        <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>
          {portfolio.subheading}
        </p>
      </section>

      {/* ── Filter tabs ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "#2563eb" : "transparent",
                color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.55)",
                border: activeCategory === cat
                  ? "1px solid #2563eb"
                  : "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Project grid ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-28">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-4 rounded-2xl py-20 text-center"
            style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)" }}
            >
              <Code2 className="size-8" style={{ color: "rgba(37,99,235,0.7)" }} strokeWidth={1.4} />
            </div>
            <div>
              <p className="text-base font-semibold text-white mb-1">No projects yet</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                We're working on{" "}
                <span style={{ color: "#2563eb" }}>{activeCategory}</span>{" "}
                projects. Check back soon.
              </p>
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const Icon = CATEGORY_ICONS[project.category] ?? Code2
            return (
              <div
                key={project.title}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Preview area */}
                <div
                  className="flex items-center justify-center h-48 border-b"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(10,22,40,0.7) 100%)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon className="size-16" style={{ color: "rgba(37,99,235,0.65)" }} strokeWidth={1.2} />
                </div>

                {/* Body */}
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#2563eb" }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.58)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.65)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.href}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white"
                    style={{ color: "#2563eb" }}
                  >
                    View Project <ExternalLink className="size-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center gap-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#2563eb" }}>
            Start Building
          </p>
          <h2 className="text-3xl font-bold text-white">
            Ready to build something great?
          </h2>
          <p className="max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
          <Link
            href="/contactPage"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: "#2563eb" }}
          >
            Start a Project <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
