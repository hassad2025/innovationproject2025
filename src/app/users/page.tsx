'use client'

import { useState } from 'react'

export default function UserDashboardPage() {
  const [userName] = useState('Alexandre') // TODO: remplacer par utilisateur connecté

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    

      {/* Contenu principal */}
      <main className="flex-1 p-6 md:p-8">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bonjour, {userName} 👋</h1>
          <p className="text-gray-600 mt-1">Bienvenue sur votre espace personnel.</p>
        </header>

        {/* Aperçu rapide */}
        <section className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Aperçu rapide</h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-center gap-2">
              <span>🎟️</span> <span>Billets achetés : <strong>5</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span>⭐</span> <span>Événements favoris : <strong>3</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span>🔔</span> <span>Notifications non lues : <strong>2</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span>🕒</span> <span>Activité récente : <strong>Connexion aujourd’hui à 10h45</strong></span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}

