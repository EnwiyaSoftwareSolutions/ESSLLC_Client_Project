"use client"
import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../../components/ui/field"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

const CATEGORIES = ["Web Development", "Mobile", "Cloud & DevOps", "AI & Automation"]

export function AdminProject() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <CheckCircle2 className="size-12" style={{ color: "#2563eb" }} />
        <h2 className="text-xl font-bold text-white">Project Created</h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>The portfolio project has been saved.</p>
        <button onClick={() => setSubmitted(false)} className="mt-2 text-sm underline" style={{ color: "#2563eb" }}>Add another</button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "#2563eb" }}>Admin</p>
      <h1 className="text-2xl font-bold text-white mb-1">New Project</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Add a new portfolio project to the showcase.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Project Title</FieldLabel>
              <Input placeholder="e.g. RetailCore" required />
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
                <FieldLabel>Project URL</FieldLabel>
                <Input placeholder="https://example.com" />
              </Field>
            </div>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea placeholder="What the project does and the outcome it achieved." rows={4} required />
            </Field>
            <Field>
              <FieldLabel>Tech Stack / Tags</FieldLabel>
              <Input placeholder="React, Node.js, MongoDB" required />
              <FieldDescription>Comma-separated list of technologies used.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button type="submit" className="w-full font-semibold" style={{ background: "#2563eb", color: "#fff" }}>
          Save Project
        </Button>
      </form>
    </div>
  )
}
