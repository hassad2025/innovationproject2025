'use client'

import { useState } from "react"

export default function Settings() {
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage("")

    // Simuler une sauvegarde
    setTimeout(() => {
      setSuccessMessage("Paramètres mis à jour avec succès.")
      setPassword("")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full border border-gray-300 rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium text-gray-700">Nouveau mot de passe</label>
          <input
            id="password"
            type="password"
            className="mt-1 w-full border border-gray-300 rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Laissez vide pour ne pas changer"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="notifications"
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <label htmlFor="notifications" className="text-sm text-gray-700">
            Recevoir des notifications par e-mail
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </form>
    </div>
  )
}
