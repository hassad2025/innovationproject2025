'use client'

type NotificationItemProps = {
  message: string
  date: string
  read?: boolean
}

export default function NotificationItem({ message, date, read = false }: NotificationItemProps) {
  return (
    <div className={`p-3 rounded-md border ${read ? 'bg-gray-50' : 'bg-indigo-50 border-indigo-200'}`}>
      <p className="text-sm text-gray-800">{message}</p>
      <span className="text-xs text-gray-500">{new Date(date).toLocaleString()}</span>
    </div>
  )
}
