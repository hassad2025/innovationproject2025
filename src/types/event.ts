export type EventStatus = "en_attente" | "publie" | "rejete";

export interface Event {
  id: string;
  titre: string;
  description: string;
  lieu: string;
  date: string;
  heure: string;
  categories: string[];
  billetsDisponibles: number;
  image?: string;
  statut: EventStatus;
  billetsVendus: number;
  organisateurId: string;
}

