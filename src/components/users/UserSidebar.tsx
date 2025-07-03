'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function UserSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) =>
    pathname === path
      ? 'bg-indigo-600 text-white'
      : 'text-gray-700 hover:bg-gray-100'

  return (
    <nav className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col p-6 space-y-4">
      <h2 className="text-xl font-bold mb-6 text-indigo-700">Mon espace</h2>

      <Link href="/users" className={`rounded-md px-4 py-2 font-medium ${isActive('/users')}`}>
        🏠 Tableau de bord
      </Link>

      <Link href="/users/profile" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/profile')}`}>
        👤 Mon profil
      </Link>

      <Link href="/users/Bookings" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/bookings')}`}>
        🎟️ Mes réservations
      </Link>

      <Link href="/users/favorites" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/favorites')}`}>
        ⭐ Favoris
      </Link>

      
      <Link href="/users/mytickets" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/mytickets')}`}>
        🎫 Mes tickets
      </Link>

      <Link href="/users/history" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/history')}`}>
        🕒 Historique
      </Link>

      <Link href="/users/notifications" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/notifications')}`}>
        🔔 Notifications
      </Link>

      <Link href="/users/settings" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/settings')}`}>
        ⚙️ Paramètres
      </Link>

      <Link href="/users/support" className={`rounded-md px-4 py-2 font-medium ${isActive('/users/support')}`}>
        🛠️ Support
      </Link>

      <button
        onClick={() => alert('Déconnexion en cours...')}
        className="mt-auto rounded-md px-4 py-2 font-medium text-red-600 hover:bg-red-100"
      >
        🚪 Déconnexion
      </button>
    </nav>
  )
}

