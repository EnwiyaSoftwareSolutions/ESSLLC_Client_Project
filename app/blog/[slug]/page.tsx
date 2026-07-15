import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, User, Tag } from "lucide-react"
import siteConfig from "@/config/site.json"

const { blog } = siteConfig

const CATEGORY_COLORS: Record<string, string> = {
  "Engineering":     "rgba(37,99,235,0.9)",
  "Product":         "rgba(124,58,237,0.9)",
  "AI & Automation": "rgba(6,182,212,0.9)",
  "Company":         "rgba(16,185,129,0.9)",
}

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading";   text: string }
  | { type: "highlight"; text: string }
  | { type: "list";      items: string[] }
  | { type: "code";      language: string; text: string }

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-base leading-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              {block.text}
            </p>
          )
        }
        if (block.type === "heading") {
          return (
            <h2 key={i} className="text-xl font-bold text-white mt-4">
              {block.text}
            </h2>
          )
        }
        if (block.type === "highlight") {
          return (
            <blockquote
              key={i}
              className="rounded-xl px-6 py-5 text-base font-medium leading-relaxed"
              style={{
                background: "rgba(37,99,235,0.12)",
                border: "1px solid rgba(37,99,235,0.3)",
                borderLeft: "4px solid #2563eb",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {block.text}
            </blockquote>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-2 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-base" style={{ color: "rgba(255,255,255,0.72)" }}>
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "#2563eb" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        if (block.type === "code") {
          return (
            <pre
              key={i}
              className="rounded-xl p-5 text-sm leading-7 overflow-x-auto"
              style={{
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              <code>{block.text}</code>
            </pre>
          )
        }
        return null
      })}
    </div>
  )
}

export function generateStaticParams() {
  return blog.posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blog.posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = blog.posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2)

  const content = (post as typeof post & { content?: ContentBlock[] }).content ?? []

  return (
    <div className="min-h-screen" style={{ background: "transparent" }}>

      {/* ── Back link ── */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <ArrowLeft className="size-4" /> Back to Blog
        </Link>
      </div>

      {/* ── Header ── */}
      <header className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
            style={{ background: CATEGORY_COLORS[post.category] ?? "rgba(37,99,235,0.9)" }}
          >
            {post.category}
          </span>
          {post.featured && (
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: "rgba(37,99,235,0.2)", color: "#93c5fd" }}
            >
              Featured
            </span>
          )}
        </div>

        <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
          {post.excerpt}
        </p>

        <div
          className="flex flex-wrap items-center gap-5 text-sm py-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span className="flex items-center gap-2">
            <User className="size-4" /> {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Tag className="size-4" /> {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4" /> {post.readTime}
          </span>
        </div>
      </header>

      {/* ── Article body ── */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <ContentRenderer blocks={content as ContentBlock[]} />
      </article>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "3rem" }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#2563eb" }}>
            More in {post.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="flex flex-col gap-3 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#2563eb" }}
                >
                  {r.category}
                </span>
                <p className="text-sm font-semibold text-white leading-snug">{r.title}</p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium mt-auto"
                  style={{ color: "#2563eb" }}
                >
                  Read <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center gap-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#2563eb" }}>
            Work With Us
          </p>
          <h2 className="text-3xl font-bold text-white">Ready to build something great?</h2>
          <p className="max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
            Tell us about your project and we'll get back to you within 24 hours.
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
