"use client"
import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../../components/ui/field"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

const CATEGORIES = ["Engineering", "Product", "AI & Automation", "Company"]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function AdminBlog() {
  const [submitted, setSubmitted] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugManual, setSlugManual] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!slugManual) setSlug(slugify(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const reset = () => { setSubmitted(false); setTitle(""); setSlug(""); setSlugManual(false) }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <CheckCircle2 className="size-12" style={{ color: "#2563eb" }} />
        <h2 className="text-xl font-bold text-white">Post Created</h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>The blog post entry has been saved.</p>
        <button onClick={reset} className="mt-2 text-sm underline" style={{ color: "#2563eb" }}>Create another</button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "#2563eb" }}>Admin</p>
      <h1 className="text-2xl font-bold text-white mb-1">New Blog Post</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Fill in the details below to publish a new article.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input placeholder="Enter article title" value={title} onChange={handleTitleChange} required />
            </Field>
            <Field>
              <FieldLabel>Slug</FieldLabel>
              <Input placeholder="url-friendly-slug" value={slug} onChange={(e) => { setSlugManual(true); setSlug(e.target.value) }} required />
              <FieldDescription>Auto-generated from title — edit to override.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Excerpt</FieldLabel>
              <Textarea placeholder="A short summary shown in the blog listing..." rows={3} required />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Read Time</FieldLabel>
                <Input placeholder="e.g. 6 min read" required />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Author</FieldLabel>
                <Input placeholder="e.g. Enwiya Engineering" required />
              </Field>
              <Field>
                <FieldLabel>Date</FieldLabel>
                <Input placeholder="e.g. Jul 14, 2026" required />
              </Field>
            </div>
            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea placeholder="Write the full article body here..." rows={10} required />
              <FieldDescription>Plain text. Use triple backticks (```) for code blocks.</FieldDescription>
            </Field>
            <div className="flex items-center gap-3 py-1">
              <Checkbox id="featured" />
              <label htmlFor="featured" className="text-sm text-white cursor-pointer">Mark as featured post</label>
            </div>
          </FieldGroup>
        </FieldSet>
        <Button type="submit" className="w-full font-semibold" style={{ background: "#2563eb", color: "#fff" }}>
          Publish Post
        </Button>
      </form>
    </div>
  )
}
