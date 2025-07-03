'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Log = {
  id: number
  message: string
  date: string
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, message: "Connexion admin réussie", date: "2025-06-15 10:03" },
    { id: 2, message: "Suppression d'un utilisateur", date: "2025-06-14 17:20" },
    { id: 3, message: "Nouvel événement ajouté", date: "2025-06-13 14:12" },
    { id: 4, message: "Paramètres mis à jour", date: "2025-06-12 09:45" },
  ])
  const [search, setSearch] = useState('')

  const filteredLogs = logs.filter((log) =>
    log.message.toLowerCase().includes(search.toLowerCase())
  )

  const clearLogs = () => {
    const confirmed = window.confirm("Es-tu sûr de vouloir supprimer tous les logs ?")
    if (confirmed) setLogs([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Logs d'administration</h2>
        <Button onClick={clearLogs} variant="destructive">Vider les logs</Button>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Rechercher dans les logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow border overflow-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{log.date}</td>
                  <td className="px-6 py-4 text-gray-900">{log.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">Aucun log trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
