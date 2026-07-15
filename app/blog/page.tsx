"use client"
import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight, Clock, User, Tag } from "lucide-react"
import siteConfig from "@/config/site.json"

const { blog } = siteConfig

const CATEGORY_COLORS: Record<string, string> = {
  "Engineering":     "rgba(37,99,235,0.9)",
  "Product":         "rgba(124,58,237,0.9)",
  "AI & Automation": "rgba(6,182,212,0.9)",
  "Company":         "rgba(16,185,129,0.9)",
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
      style={{ background: CATEGORY_COLORS[category] ?? "rgba(37,99,235,0.9)" }}
    >
      {category}
    </span>
  )
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All")

  const featured = blog.posts.find((p) => p.featured)
  const filtered = blog.posts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "All" || p.category === activeCategory)

  const featuredVisible =
    activeCategory === "All" || featured?.category === activeCategory

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <p
          className="text-xs font-bold uppercase tracking-[0.18em] mb-4"
          style={{ color: "#2563eb" }}
        >
          Blog
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            {blog.heading}
          </h1>
          <p
            className="text-base leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            {blog.description}
          </p>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-wrap gap-2">
          {blog.categories.map((cat) => (
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-28 flex flex-col gap-6">

        {/* ── Featured post ── */}
        {featured && featuredVisible && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group flex flex-col md:flex-row rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              border: "1px solid rgba(37,99,235,0.35)",
              background: "linear-gradient(135deg, rgba(37,99,235,0.14) 0%, rgba(10,22,40,0.65) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Visual strip */}
            <div
              className="md:w-2 shrink-0"
              style={{ background: "linear-gradient(to bottom, #2563eb, #06b6d4)" }}
            />

            <div className="flex flex-col gap-4 p-8 flex-1">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                  style={{ background: "rgba(37,99,235,0.25)", color: "#93c5fd" }}
                >
                  Featured
                </span>
                <CategoryBadge category={featured.category} />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                {featured.excerpt}
              </p>

              <div
                className="flex items-center gap-5 text-xs mt-auto pt-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5" /> {featured.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="size-3.5" /> {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {featured.readTime}
                </span>
              </div>

              <span
                className="inline-flex items-center gap-1.5 text-sm font-medium mt-1 transition-colors group-hover:text-white"
                style={{ color: "#2563eb" }}
              >
                Read article <ArrowRight className="size-3.5" />
              </span>
            </div>
          </Link>
        )}

        {/* ── Posts grid ── */}
        {filtered.length === 0 && !featuredVisible ? (
          <div
            className="flex flex-col items-center justify-center gap-4 rounded-2xl py-20 text-center"
            style={{
              border: "1px dashed rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)" }}
            >
              <Tag className="size-7" style={{ color: "rgba(37,99,235,0.7)" }} strokeWidth={1.4} />
            </div>
            <div>
              <p className="text-base font-semibold text-white mb-1">No posts yet</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                No{" "}
                <span style={{ color: "#2563eb" }}>{activeCategory}</span>{" "}
                articles published yet. Check back soon.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Category colour bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: CATEGORY_COLORS[post.category] ?? "#2563eb" }}
                />

                <div className="flex flex-col gap-3 p-6 flex-1">
                  <CategoryBadge category={post.category} />

                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    className="flex items-center gap-4 text-xs mt-2 pt-3"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <User className="size-3" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1.5 ml-auto">
                      <Clock className="size-3" /> {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center gap-5">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "#2563eb" }}
          >
            Stay in the Loop
          </p>
          <h2 className="text-3xl font-bold text-white">Want to work with us?</h2>
          <p
            className="max-w-md leading-relaxed"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            We publish new articles regularly. In the meantime, let's talk about your project.
          </p>
          <Link
            href="/contactPage"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: "#2563eb" }}
          >
            Get in Touch <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
