'use client'

import { useEffect, useState } from "react"

interface Notification {
  id: string
  message: string
  date: string
  read: boolean
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        const fetchedNotifications: Notification[] = [
          {
            id: "n1",
            message: "Votre billet pour 'Tech Summit 2025' est confirmé.",
            date: "2025-06-14T09:00:00Z",
            read: false
          },
          {
            id: "n2",
            message: "Un nouvel événement que vous pourriez aimer est disponible.",
            date: "2025-06-12T17:30:00Z",
            read: true
          }
        ]
        setNotifications(fetchedNotifications)
      } catch {
        setError("Impossible de charger les notifications.")
      } finally {
        setLoading(false)
      }
    }, 1000)
  }, [])

  if (loading) return <p className="p-6 text-center">Chargement des notifications...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mes notifications</h1>
      {notifications.length === 0 ? (
        <p>Aucune notification pour le moment.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`py-4 px-3 rounded-md ${
                notif.read ? "bg-white" : "bg-indigo-50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium">{notif.message}</p>
                <span className="text-sm text-gray-500">
                  {new Date(notif.date).toLocaleDateString()}
                </span>
              </div>
              {!notif.read && (
                <span className="text-xs text-indigo-700 font-semibold">Non lu</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
