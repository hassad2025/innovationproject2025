"use client";
import './AdminEvents.module.css';


import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle, X } from "lucide-react";


type EventType = {
  id: number;
  title: string;
  date: string;
  location: string;
  status: "pending" | "approved" | "rejected";
  category: string;
  description: string;
};

const sampleEvents: EventType[] = [
  {
    id: 1,
    title: "Concert Jazz",
    date: "2025-07-01",
    location: "Paris",
    status: "pending",
    category: "Musique",
    description:
      "Un concert exceptionnel de jazz avec des artistes internationaux dans un cadre intimiste.",
  },
  {
    id: 2,
    title: "Conférence Tech",
    date: "2025-07-15",
    location: "Lyon",
    status: "approved",
    category: "Conférence",
    description:
      "Une conférence sur les dernières innovations technologiques avec des experts du secteur.",
  },
  {
    id: 3,
    title: "Marathon",
    date: "2025-08-01",
    location: "Marseille",
    status: "pending",
    category: "Sport",
    description:
      "Participez au marathon annuel de Marseille, une course pour tous les niveaux.",
  },
  {
    id: 4,
    title: "Atelier Peinture",
    date: "2025-06-25",
    location: "Nice",
    status: "rejected",
    category: "Art",
    description:
      "Un atelier créatif pour apprendre différentes techniques de peinture.",
  },
];

export default function AdminEvents() {
  const [events, setEvents] = useState(sampleEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const itemsPerPage = 5;

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === "all" || event.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [events, searchTerm, statusFilter]);

  const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleApprove(id: number) {
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === id ? { ...evt, status: "approved" } : evt
      )
    );
  }
  function handleDelete(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      setEvents((prev) => prev.filter((evt) => evt.id !== id));
      if(selectedEvent?.id === id) setSelectedEvent(null);
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#2c2c2c]">Gestion des événements</h1>

      {/* Filtres & Recherche */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Recherche par titre, lieu, catégorie..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as any);
            setCurrentPage(1);
          }}
          className="w-full sm:w-48 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="approved">Validé</option>
          <option value="rejected">Rejeté</option>
        </select>
      </div>

      {/* Tableau des événements */}
      <div className="overflow-x-auto border rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEvents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucun événement trouvé.
                </TableCell>
              </TableRow>
            )}
            {paginatedEvents.map((event) => (
              <TableRow
                key={event.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <TableCell>{event.title}</TableCell>
                <TableCell>{new Date(event.date).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>
                  <StatusBadge status={event.status} />
                </TableCell>
                <TableCell
                  className="flex justify-center gap-2"
                  onClick={(e) => e.stopPropagation()} // Empêche l’ouverture du modal quand on clique sur un bouton
                >
                  {event.status === "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                      onClick={() => handleApprove(event.id)}
                      title="Valider l'événement"
                    >
                      <CheckCircle size={18} />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    title="Modifier"
                    onClick={() => alert("Fonction modifier non implémentée")}
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(event.id)}
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modal descriptif */}
      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent(null)}>
          <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
          <p className="mb-2"><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString("fr-FR")}</p>
          <p className="mb-2"><strong>Lieu:</strong> {selectedEvent.location}</p>
          <p className="mb-2"><strong>Catégorie:</strong> {selectedEvent.category}</p>
          <p className="mb-2"><strong>Statut:</strong> <StatusBadge status={selectedEvent.status} /></p>
          <p className="mt-4 whitespace-pre-line">{selectedEvent.description}</p>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Fermer
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: EventType["status"] }) {
  let colorClass = "";
  let label = "";
  switch (status) {
    case "pending":
      colorClass = "bg-yellow-100 text-yellow-800";
      label = "En attente";
      break;
    case "approved":
      colorClass = "bg-green-100 text-green-800";
      label = "Validé";
      break;
    case "rejected":
      colorClass = "bg-red-100 text-red-800";
      label = "Rejeté";
      break;
  }
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}
    >
      {label}
    </span>
  );
}

function Pagination({
  currentPage,
  pageCount,
  onPageChange,
}: {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center gap-2 mt-4">
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Précédent
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Suivant
      </Button>
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Fermer le modal"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
