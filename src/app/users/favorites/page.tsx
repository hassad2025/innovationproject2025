'use client'

import { useEffect, useState } from "react"

interface FavoriteEvent {
  id: string
  title: string
  date: string
  location: string
  category: string[]
  image?: string
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simule récupération des favoris (API)
  useEffect(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        const fetchedFavorites: FavoriteEvent[] = [
          {
            id: "e1",
            title: "Festival Musique Jazz",
            date: "2025-07-15",
            location: "Montpellier",
            category: ["Musique", "Festival"],
            image: "https://ville-sanguinet.fr/var/sanguinet/storage/images/_aliases/landscape_1920/5/9/1/1/121195-1-fre-FR/b7e94b1192e6-affiche-jazz-format-paysage.jpg"
          },
          {
            id: "e2",
            title: "Salon Tech Innov",
            date: "2025-09-05",
            location: "Lyon",
            category: ["Conférence", "Tech"],
            image: "data:image/png;base64,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",}
        ]
        setFavorites(fetchedFavorites)
      } catch {
        setError("Erreur lors du chargement des favoris.")
      } finally {
        setLoading(false)
      }
    }, 1200)
  }, [])

  if (loading) return <p className="p-6 text-center">Chargement des favoris...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mes événements favoris</h1>
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore ajouté d'événements favoris.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map(event => (
            <div
              key={event.id}
              className="border rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600">{event.location}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {event.category.map(cat => (
                    <span
                      key={cat}
                      className="bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
