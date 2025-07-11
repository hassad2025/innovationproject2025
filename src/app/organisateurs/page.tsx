'use client'

import { useState } from "react";
import EventForm from "@/components/organisateurs/EventForm";
import StatsOverview from "@/components/organisateurs/StatsOverview";
import OrganisateurEventsList from "@/components/organisateurs/OrganisateurEventsList";
import { Event } from "@/types/event";

import styles from './OrganisateurDashboard.module.css';

export default function OrganisateurDashboardPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      titre: "Conférence IA 2025",
      description: "Un événement sur l'intelligence artificielle",
      location: "Paris",
      date: "2025-08-20",
      heure: "18:00",
      category: ["Conférence"],
      billetsDisponibles: 100,
      billetsVendus: 40,
      statut: "en_attente",
      image: "",
      organisateurId: "org1"
    },
    {
      id: "2",
      titre: "Concert Open Air",
      description: "Un grand concert en plein air",
      location: "Lyon",
      date: "2025-09-10",
      heure: "20:00",
      category: ["Musique"],
      billetsDisponibles: 200,
      billetsVendus: 150,
      statut: "publie",
      image: "",
      organisateurId: "org1"
    }
  ]);

  const handleAddEvent = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tableau de bord Organisateur</h1>

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

      <section className={styles.section}>
        <h2 className={styles.sectionTitleDark}>📅 Mes événements</h2>
        <OrganisateurEventsList events={events} />
      </section>
    </div>
  );
}


