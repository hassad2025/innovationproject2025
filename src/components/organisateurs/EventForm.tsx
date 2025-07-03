'use client'

import React, { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Event = {
  id: string
  titre: string
  description: string
  location: string
  date: string
  heure: string           // ajouté
  category: string[]
  billetsDisponibles: number
  billetsVendus: number
  image?: string
  statut: "en_attente" | "publie" | "rejete"
  organisateurId: string  // ajouté
}

type EventFormProps = {
  onAddEvent: (newEvent: Event) => void
}

export default function EventForm({ onAddEvent }: EventFormProps) {
  const [form, setForm] = useState({
    titre: "",
    description: "",
    location: "",
    date: "",
    heure: "",              // ajouté
    category: "",
    billetsDisponibles: 0,
    image: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === "billetsDisponibles" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { titre, description, location, date, heure, category, billetsDisponibles } = form
    if (!titre || !description || !location || !date || !heure || !category) {
      toast.error("Veuillez remplir tous les champs obligatoires.")
      return
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      titre,
      description,
      location,
      date,
      heure,
      category: category.split(",").map(c => c.trim()), // converti en tableau
      billetsDisponibles,
      billetsVendus: 0,
      image: form.image || undefined,
      statut: "en_attente",
      organisateurId: "org1", // tu peux le remplacer dynamiquement si besoin
    }

    onAddEvent(newEvent)

    toast.success("Événement créé avec succès.")

    setForm({
      titre: "",
      description: "",
      location: "",
      date: "",
      heure: "",
      category: "",
      billetsDisponibles: 0,
      image: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
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
        type="date"
        required
      />
      <Input
        name="heure"
        value={form.heure}
        onChange={handleChange}
        type="time"
        required
      />
      <Input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Catégories (séparées par des virgules)"
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
  )
}

