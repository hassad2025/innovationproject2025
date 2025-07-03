'use client'

import { ReactNode } from 'react'

import UserSidebar from '@/components/users/UserSidebar'

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar fixe */}
      <aside className="hidden md:block">
        <UserSidebar />
      </aside>

      {/* Contenu de page */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
