'use client'

type EventCardProps = {
  title: string
  date: string
  location: string
  category?: string
  image?: string
}

export default function EventCard({
  title,
  date,
  location,
  category,
  image,
}: EventCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex gap-4 hover:shadow-md transition">
      {image && (
        <img src={image} alt={title} className="w-24 h-24 object-cover rounded-md" />
      )}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{location} - {new Date(date).toLocaleDateString()}</p>
        {category && <span className="text-xs text-indigo-500">{category}</span>}
      </div>
    </div>
  )
}
