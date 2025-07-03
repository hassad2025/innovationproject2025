'use client'

import { useState } from 'react'

export default function Support() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    // Simulation de l'envoi
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setSubject('')
      setMessage('')
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Support</h1>

      <p className="mb-4 text-gray-700">
        Vous avez un problème ou une question ? Contactez-nous via le formulaire ci-dessous.
      </p>

      {success && (
        <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
          Votre message a été envoyé avec succès. Nous reviendrons vers vous rapidement.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block font-medium text-gray-700">Sujet</label>
          <input
            id="subject"
            type="text"
            className="mt-1 w-full border border-gray-300 rounded p-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            rows={5}
            className="mt-1 w-full border border-gray-300 rounded p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  )
}
