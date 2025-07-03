// components/organisateur/EventCard.tsx
import { Event } from "@/types/event"
import EventStatusBadge from "./EventStatusBadge"
import Link from "next/link"

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{event.titre}</h3>
        <EventStatusBadge statut={event.statut} />
      </div>
      <p className="text-gray-600 text-sm">{event.description}</p>
      <p className="text-sm text-gray-500">Lieu : {event.location} – {event.date} à {event.heure}</p>
      <p className="text-sm text-gray-500">Billets vendus : {event.billetsVendus} / {event.billetsDisponibles}</p>

      <div className="flex gap-3 mt-2">
        <Link href={`/organisateurs/${event.id}`}
          className="text-blue-600 hover:underline text-sm">Voir</Link>
        {event.statut === "en_attente" && (
          <Link href={`/organisateurs/${event.id}/edit`} className="text-yellow-600 hover:underline text-sm">
            Modifier
          </Link>
        )}
      </div>
    </div>
  )
}
