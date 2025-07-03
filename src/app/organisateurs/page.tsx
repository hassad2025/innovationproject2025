'use client'

import { useState } from "react"
import OrganisateurEventsList from "@/components/organisateurs/OrganisateurEventsList"
import EventForm from "@/components/organisateurs/EventForm"
import StatsOverview from "@/components/organisateurs/StatsOverview"
import { Event } from "@/types/event"

import styles from './OrganisateurDashboard.module.css'

export default function OrganisateurDashboardPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      titre: "Conférence IA 2025",
      description: "Un événement sur l'intelligence artificielle",
      lieu: "Paris",
      date: "2025-08-20",
      heure: "18:00",
      categorie: ["Conférence", "Tech"],
      billetsDisponibles: 100,
      billetsVendus: 40,
      statut: "en_attente",
      image: ""
    },
    {
      id: "2",
      titre: "Concert Open Air",
      description: "Un grand concert en plein air",
      lieu: "Lyon",
      date: "2025-09-10",
      heure: "20:00",
      categorie: ["Musique"],
      billetsDisponibles: 200,
      billetsVendus: 150,
      statut: "publie",
      image: ""
    }
  ])

  const handleAddEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events])
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tableau de bord Organisateur</h1>

      {/* Bloc horizontal: stats + formulaire */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        <section className={styles.section} style={{ flex: '1 1 350px', minWidth: '300px' }}>
          <StatsOverview events={events} />
        </section>

        <section className={styles.section} style={{ flex: '1 1 350px', minWidth: '300px' }}>
          <h2 className={styles.sectionTitle}>Ajouter un nouvel événement</h2>
          <EventForm onAddEvent={handleAddEvent} />
        </section>
      </div>

      {/* Liste des événements - full width */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitleDark}>📅 Mes événements</h2>
        <OrganisateurEventsList events={events} />
      </section>
    </div>
  )
}

