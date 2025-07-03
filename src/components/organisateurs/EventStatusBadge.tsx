type Props = {
  statut: "en_attente" | "publie" | "rejete"
}

export default function EventStatusBadge({ statut }: Props) {
  const getBadgeColor = () => {
    switch (statut) {
      case "publie":
        return "bg-green-100 text-green-700 border-green-300"
      case "en_attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "rejete":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getLabel = () => {
    switch (statut) {
      case "publie":
        return "Publié"
      case "en_attente":
        return "En attente"
      case "rejete":
        return "Rejeté"
      default:
        return "Inconnu"
    }
  }

  return (
    <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getBadgeColor()}`}>
      {getLabel()}
    </span>
  )
}
