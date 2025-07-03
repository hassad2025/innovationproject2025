export type EventStatus = "en_attente" | "publie" | "rejete";

export interface Event {
  id: string;
  titre: string;
  description: string;
  location: string;
  date: string;          
  heure: string;        
  category: string[];  
  billetsDisponibles: number;
  billetsVendus: number;
  image?: string;
  statut: EventStatus;
  organisateurId: string;
}

