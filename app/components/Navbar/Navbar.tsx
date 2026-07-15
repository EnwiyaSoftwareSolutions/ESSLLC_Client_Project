"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import logoSrc from "../../../utils/images/essLogoWhite.png"
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { cn } from "@/lib/utils"
import siteConfig from "@/config/site.json"

const { brand, nav } = siteConfig
const { 
    // services,
     company, links, cta } = nav

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between pl-0 pr-4 relative right-[100px] sm:pr-6 lg:pr-8">

        {/* Logo */}
        <Link href={brand.href} className="flex items-center gap-1 shrink-0">
          <Image
            src={logoSrc}
            alt={brand.logoAlt}
            className="h-14 w-14 object-contain"
            priority
          />
          <span className="hidden sm:block text-sm font-semibold tracking-tight">
            {brand.name}{" "}
            <span className="font-normal text-muted-foreground">{brand.tagline}</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* <NavigationMenuTrigger>Services</NavigationMenuTrigger> */}
                {/* <NavigationMenuContent> */}
                  {/* <ul className="grid w-[480px] grid-cols-2 gap-1 p-3">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink
                          render={
                            <Link href={service.href}>
                              <div className="flex gap-3">
                                <span className="mt-0.5 text-base leading-none">{service.icon}</span>
                                <div>
                                  <div className="text-sm font-medium">{service.title}</div>
                                  <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                                    {service.description}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          }
                        />
                      </li>
                    ))}
                  </ul> */}
                {/* </NavigationMenuContent> */}
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[260px] space-y-1 p-3">
                    {company.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink
                          render={
                            <Link href={item.href}>
                              <div className="text-sm font-medium">{item.title}</div>
                              <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                                {item.description}
                              </div>
                            </Link>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    render={
                      <Link
                        href={link.href}
                        className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        {link.label}
                      </Link>
                    }
                  />
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href={cta.href}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            {cta.label}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden rounded-lg p-2 hover:bg-muted transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/60 bg-background px-4 pb-5 pt-3 space-y-1">
          {/* <MobileSection
            title="Services"
            items={services.map(({ title, href }) => ({ title, href }))}
            onNavigate={() => setMobileOpen(false)}
          /> */}
          <MobileSection
            title="Company"
            items={company.map(({ title, href }) => ({ title, href }))}
            onNavigate={() => setMobileOpen(false)}
          />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border/60">
            <Link
              href={cta.href}
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background"
            >
              {cta.label} <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function MobileSection({
  title,
  items,
  onNavigate,
}: {
  title: string
  items: { title: string; href: string }[]
  onNavigate: () => void
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        {title}
        <ChevronRight className={cn("size-4 text-muted-foreground transition-transform duration-200", open && "rotate-90")} />
      </button>
      {open && (
        <div className="mt-1 ml-3 space-y-1 border-l border-border/60 pl-3">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onNavigate}
              className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
