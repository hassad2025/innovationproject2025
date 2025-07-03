'use client'

import { useEffect, useState } from "react"

interface Ticket {
  id: string
  eventTitle: string
  eventDate: string
  seat?: string
  price: number
  status: "valid" | "used" | "cancelled"
}

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simule un fetch de billets achetés (ex: API)
  useEffect(() => {
    setLoading(true)
    setError(null)
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Exemple de données reçues
        const fetchedTickets: Ticket[] = [
          {
            id: "t1",
            eventTitle: "Conférence IA 2025",
            eventDate: "2025-08-20",
            seat: "A12",
            price: 50,
            status: "valid"
          },
          {
            id: "t2",
            eventTitle: "Concert Open Air",
            eventDate: "2025-09-10",
            seat: "B4",
            price: 75,
            status: "used"
          }
        ]
        setTickets(fetchedTickets)
      } catch (err) {
        setError("Erreur lors du chargement des billets.")
      } finally {
        setLoading(false)
      }
    }, 1500)
  }, [])

  if (loading) return <p className="p-6 text-center">Chargement des billets...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mes billets achetés</h1>
      {tickets.length === 0 ? (
        <p>Vous n'avez aucun billet acheté pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map(ticket => (
            <li
              key={ticket.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{ticket.eventTitle}</h2>
              <p>Date : {new Date(ticket.eventDate).toLocaleDateString()}</p>
              {ticket.seat && <p>Place : {ticket.seat}</p>}
              <p>Prix : {ticket.price} €</p>
              <p
                className={`mt-2 inline-block px-2 py-1 rounded text-sm font-medium ${
                  ticket.status === "valid"
                    ? "bg-green-200 text-green-800"
                    : ticket.status === "used"
                    ? "bg-gray-300 text-gray-700"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {ticket.status === "valid"
                  ? "Valide"
                  : ticket.status === "used"
                  ? "Utilisé"
                  : "Annulé"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
