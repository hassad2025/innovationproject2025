'use client'

type TicketCardProps = {
  eventName: string
  date: string
  location: string
  quantity: number
  ticketId: string
}

export default function TicketCard({
  eventName,
  date,
  location,
  quantity,
  ticketId,
}: TicketCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-indigo-700">{eventName}</h3>
      <p className="text-sm text-gray-600">{location} - {new Date(date).toLocaleString()}</p>
      <p className="text-sm mt-2 text-gray-800">Quantité : {quantity}</p>
      <p className="text-xs mt-2 text-gray-400">ID Billet : {ticketId}</p>
    </div>
  )
}
