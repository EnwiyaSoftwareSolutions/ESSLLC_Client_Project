"use client"
import React, { useState } from 'react'
import { AdminBlog } from '../components/adminBlog/AdminBlog'
import { AdminProject } from '../components/adminProject/AdminProject'
import { FileText, FolderKanban } from 'lucide-react'

const NAV = [
  { key: 'blog',    label: 'New Blog Post', icon: FileText },
  { key: 'project', label: 'New Project',   icon: FolderKanban },
]

const AdminPage = () => {
  const [selected, setSelected] = useState('blog')

  return (
    <div className="min-h-screen flex" style={{ background: 'transparent' }}>

      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col gap-1 w-56 shrink-0 p-4 pt-10"
        style={{ borderRight: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] px-3 mb-4" style={{ color: '#2563eb' }}>
          Admin
        </p>
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-left transition-all duration-150"
            style={{
              background: selected === key ? 'rgba(37,99,235,0.18)' : 'transparent',
              color:      selected === key ? '#fff' : 'rgba(255,255,255,0.5)',
              border:     selected === key ? '1px solid rgba(37,99,235,0.35)' : '1px solid transparent',
            }}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </button>
        ))}
      </aside>

      {/* Mobile tab bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 flex z-50"
        style={{ background: 'rgba(9,18,40,0.95)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors"
            style={{ color: selected === key ? '#2563eb' : 'rgba(255,255,255,0.45)' }}
          >
            <Icon className="size-5" />
            {label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-8 py-10 pb-24 md:pb-10">
        <div className="mx-auto max-w-2xl">
          {selected === 'blog'    && <AdminBlog />}
          {selected === 'project' && <AdminProject />}
        </div>
      </main>
    </div>
  )
}

export default AdminPage
