"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Event = {
  id: string
  titre: string
  description: string
  location: string
  date: string
  category: string
  billetsDisponibles: number
  billetsVendus: number
  image?: string
  statut: "en_attente" | "publie" | "rejete"
}

const statusMap = {
  en_attente: { label: "En attente", color: "warning" },
  publie: { label: "Publié", color: "success" },
  rejete: { label: "Rejeté", color: "destructive" },
}

export default function EventForm() {
  const [events, setEvents] = useState<Event[]>([])

  // Form state
  const [form, setForm] = useState({
    titre: "",
    description: "",
    location: "",
    date: "",
    category: "",
    billetsDisponibles: 0,
    image: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "billetsDisponibles" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { titre, description, location, date, category, billetsDisponibles } = form
    if (!titre || !description || !location || !date || !category) {
      toast.error("Veuillez remplir tous les champs obligatoires.")
      return
    }
    const newEvent: Event = {
      id: Date.now().toString(),
      titre,
      description,
      location,
      date,
      category,
      billetsDisponibles,
      billetsVendus: 0,
      image: form.image,
      statut: "en_attente",
    }
    setEvents((prev) => [...prev, newEvent])
    toast.success("Événement créé avec succès.")
    setForm({
      titre: "",
      description: "",
      location: "",
      date: "",
      category: "",
      billetsDisponibles: 0,
      image: "",
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Confirmer la suppression de cet événement ?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id))
      toast.success("Événement supprimé.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold">Créer un événement</h2>
        <Input
          name="titre"
          value={form.titre}
          onChange={handleChange}
          placeholder="Titre de l'événement"
          required
        />
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="À propos de l’événement"
          required
        />
        <Input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Lieu"
          required
        />
        <Input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="datetime-local"
          required
        />
        <Input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Catégorie"
          required
        />
        <Input
          name="billetsDisponibles"
          value={form.billetsDisponibles}
          onChange={handleChange}
          type="number"
          placeholder="Nombre de billets"
          min={0}
          required
        />
        <Input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL de l’image (optionnel)"
        />
        <Button type="submit">Publier</Button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {events.length === 0 ? (
          <p>Aucun événement trouvé.</p>
        ) : (
          events.map((event) => (
            <Card key={event.id} className="relative group hover:shadow-md transition">
              <CardHeader className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{event.titre}</h3>
                <Badge variant={statusMap[event.statut]?.color ?? "default"}>
                  {statusMap[event.statut]?.label ?? "Inconnu"}
                </Badge>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  <strong>Date :</strong> {new Date(event.date).toLocaleString()}
                </p>
                <p>
                  <strong>Billets :</strong> {event.billetsVendus} / {event.billetsDisponibles}
                </p>
                <p>
                  <strong>Lieu :</strong> {event.location}
                </p>
                <p>
                  <strong>Catégorie :</strong> {event.category}
                </p>
                <p>{event.description}</p>
                {event.image && (
                  <img
                    src={event.image}
                    alt={`Image de ${event.titre}`}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                {event.statut === "en_attente" && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

