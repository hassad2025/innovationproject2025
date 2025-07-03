"use client"

import React, { useState } from "react"
import { Event } from '@/types/event'
import { Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const statusMap = {
  en_attente: { label: "En attente", color: "warning" },
  publie: { label: "Publié", color: "success" },
  rejete: { label: "Rejeté", color: "destructive" },
}

export default function OrganisateurEventsList({ events: initialEvents }: { events: Event[] }) {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<{ titre: string }>({ titre: "" })

  const startEdit = (event: Event) => {
    setEditingId(event.id)
    setFormData({ titre: event.titre })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ titre: "" })
  }

  const saveEdit = () => {
    if (!formData.titre.trim()) {
      toast.error("Le titre ne peut pas être vide")
      return
    }

    setEvents((prev) =>
      prev.map((e) => (e.id === editingId ? { ...e, titre: formData.titre } : e))
    )
    toast.success("Événement modifié")
    cancelEdit()
  }

  const handleDelete = (id: string) => {
    if (confirm("Confirmer la suppression de cet événement ?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id))
      toast.success("Événement supprimé")
      if (editingId === id) cancelEdit()
    }
  }

  if (events.length === 0) {
    return <p>Aucun événement trouvé.</p>
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {events.map((event) => (
        <Card key={event.id} className="relative group hover:shadow-md transition">
          <CardHeader className="flex items-center justify-between">
            {editingId === event.id ? (
              <input
                type="text"
                className="border p-1 rounded w-full"
                value={formData.titre}
                onChange={(e) => setFormData({ titre: e.target.value })}
              />
            ) : (
              <h3 className="text-lg font-semibold">{event.titre}</h3>
            )}
            <Badge variant={statusMap[event.statut]?.color ?? "default"}>
              {statusMap[event.statut]?.label ?? "Inconnu"}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Date :</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Billets :</strong> {event.billetsVendus} / {event.billetsDisponibles}
            </p>

            {event.statut === "en_attente" && (
              <div className="flex gap-2 pt-2">
                {editingId === event.id ? (
                  <>
                    <Button variant="success" size="sm" onClick={saveEdit}>
                      <Check className="w-4 h-4 mr-1" /> Enregistrer
                    </Button>
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      <X className="w-4 h-4 mr-1" /> Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => startEdit(event)}>
                      <Pencil className="w-4 h-4 mr-1" /> Modifier
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                    </Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
