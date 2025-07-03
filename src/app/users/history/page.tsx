'use client'

import { useEffect, useState } from "react"

interface Activity {
  id: string
  date: string
  description: string
}

export default function History() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        const fetchedActivities: Activity[] = [
          {
            id: "a1",
            date: "2025-05-01T14:30:00Z",
            description: "Acheté un billet pour 'Conférence IA 2025'"
          },
          {
            id: "a2",
            date: "2025-04-15T10:00:00Z",
            description: "Ajouté 'Concert Open Air' à vos favoris"
          },
          {
            id: "a3",
            date: "2025-03-20T16:45:00Z",
            description: "Modifié votre profil utilisateur"
          }
        ]
        setActivities(fetchedActivities)
      } catch {
        setError("Erreur lors du chargement de l'historique.")
      } finally {
        setLoading(false)
      }
    }, 1000)
  }, [])

  if (loading) return <p className="p-6 text-center">Chargement de l'historique...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Historique de vos activités</h1>
      {activities.length === 0 ? (
        <p>Vous n'avez aucune activité récente.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {activities.map(activity => (
            <li key={activity.id} className="py-4">
              <time className="block text-sm text-gray-500 mb-1">
                {new Date(activity.date).toLocaleString()}
              </time>
              <p>{activity.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
