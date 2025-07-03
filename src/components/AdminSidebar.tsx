'use client'

import { useState } from "react"
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Home, Users, CalendarDays, Settings, Bell, Shield, ChevronLeft, ChevronRight } from "lucide-react"

const links = [
  { label: "Tableau de bord", href: "/admin", icon: <Home className="w-5 h-5" /> },
  { label: "Utilisateurs", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { label: "Événements", href: "/admin/events", icon: <CalendarDays className="w-5 h-5" /> },
  { label: "Notifications", href: "/admin/notifications", icon: <Bell className="w-5 h-5" /> },
  { label: "Historique", href: "/admin/logs", icon: <Shield className="w-5 h-5" /> },
  { label: "Paramètres", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-white border-r border-gray-200 p-4 shadow-lg transition-width duration-300 ease-in-out select-none",
        isOpen ? "w-64" : "w-16"
      )}
      aria-label="Sidebar de navigation admin"
    >
      {/* Header avec logo + toggle */}
      <div className="flex items-center justify-between mb-8">
        {isOpen && (
          <h1 className="text-2xl font-extrabold tracking-wide text-indigo-700 select-text">
            Eventify Admin
          </h1>
        )}
        <button
          aria-label={isOpen ? "Réduire la sidebar" : "Agrandir la sidebar"}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          type="button"
          tabIndex={0}
        >
          {isOpen ? (
            <ChevronLeft className="w-6 h-6 text-indigo-600" />
          ) : (
            <ChevronRight className="w-6 h-6 text-indigo-600" />
          )}
        </button>
      </div>

      <Separator className={cn("mb-6", !isOpen && "mx-auto w-10")} />

      {/* Navigation links */}
      <nav role="navigation" aria-label="Navigation principale" className="flex flex-col gap-1">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200",
                active
                  ? "bg-indigo-100 text-indigo-700 font-semibold shadow-inner"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700",
                "focus:outline-none focus:ring-2 focus:ring-indigo-400"
              )}
              tabIndex={0}
              title={link.label}
            >
              <div className={cn("text-indigo-600", active && "text-indigo-700")}>
                {link.icon}
              </div>

              {/* Label animé avec fade */}
              <span
                className={cn(
                  "whitespace-nowrap origin-left transition-opacity duration-300",
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                {link.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

