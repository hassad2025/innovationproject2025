'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface UserProfile {
  nom: string
  prenom: string
  email: string
  telephone?: string
}

interface UserProfileFormProps {
  initialData?: UserProfile
  onSave: (data: UserProfile) => void
}

export default function UserProfileForm({ initialData, onSave }: UserProfileFormProps) {
  const [form, setForm] = useState<UserProfile>({
    nom: initialData?.nom || "",
    prenom: initialData?.prenom || "",
    email: initialData?.email || "",
    telephone: initialData?.telephone || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nom || !form.prenom || !form.email) {
      toast.error("Nom, prénom et email sont obligatoires.")
      return
    }
    onSave(form)
    toast.success("Profil mis à jour avec succès.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Mon profil</h2>

      <Input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" required />
      <Input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" required />
      <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <Input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Téléphone (optionnel)" />

      <Button type="submit">Enregistrer</Button>
    </form>
  )
}
