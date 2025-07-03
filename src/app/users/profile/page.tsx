'use client'

import { useState } from "react"
import UserProfileForm from "./UserProfileForm"

export default function UserProfilePage() {
  const [user, setUser] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    telephone: "0601020304",
  })

  const handleSave = (updatedData: typeof user) => {
    // Ici tu peux faire un appel API pour sauvegarder en base
    setUser(updatedData)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-start">
      <UserProfileForm initialData={user} onSave={handleSave} />
    </div>
  )
}
