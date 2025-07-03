"use client";

import React, { useMemo, useState } from "react";
import "./admin-organizers.css";

const initialOrganizers = [
  { id: 1, name: "Dupont", prenom: "Jean", email: "jean.dupont@example.com", phone: "+33 6 12 34 56 78", status: "Actif" },
  { id: 2, name: "Curie", prenom: "Marie", email: "marie.curie@example.com", phone: "+33 6 98 76 54 32", status: "Inactif" },
  { id: 3, name: "Martin", prenom: "Jul", email: "paul.martin@example.com", phone: "+33 7 11 22 33 44", status: "Actif" },
  { id: 4, name: "Lambert", prenom: "Séréna", email: "sophie.lambert@example.com", phone: "+33 6 55 44 33 22", status: "Actif" },
  { id: 5, name: "Moreau", prenom: "William", email: "alice.moreau@example.com", phone: "+33 6 77 88 99 00", status: "Inactif" },
  { id: 6, name: "Durand", prenom: "Jo", email: "thomas.durand@example.com", phone: "+33 6 44 55 66 77", status: "Actif" },
  { id: 7, name: "Petit", prenom: "Mathieu", email: "isabelle.petit@example.com", phone: "+33 6 33 22 11 00", status: "Actif" },
  { id: 8, name: "Bernard", prenom: "Léo", email: "luc.bernard@example.com", phone: "+33 6 88 77 66 55", status: "Inactif" },
  { id: 9, name: "Fontaine", prenom: "Kevin", email: "claire.fontaine@example.com", phone: "+33 6 99 88 77 66", status: "Actif" },
  { id: 10, name: "Leroy", prenom: "Sane", email: "david.leroy@example.com", phone: "+33 6 11 22 33 44", status: "Actif" },
];

type Organizer = typeof initialOrganizers[0];

export default function AdminOrganizersPage() {
  const [organizers, setOrganizers] = useState<Organizer[]>(initialOrganizers);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof Organizer | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Filtrage
  const filtered = useMemo(() => {
    const search = filter.toLowerCase();
    return organizers.filter(o =>
      o.name.toLowerCase().includes(search) ||
      o.prenom.toLowerCase().includes(search) ||
      o.email.toLowerCase().includes(search) ||
      o.phone.toLowerCase().includes(search)
    );
  }, [filter, organizers]);

  // Tri
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [filtered, sortKey, sortAsc]);

  // Pagination
  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  // Gestion du tri par colonne
  const handleSort = (key: keyof Organizer) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // Gestion suppression
  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedId != null) {
      setOrganizers(prev => prev.filter(o => o.id !== selectedId));
      // Ajuste la page si nécessaire
      setCurrentPage(p => {
        const newLength = organizers.length - 1;
        const maxPage = Math.max(1, Math.ceil(newLength / ITEMS_PER_PAGE));
        return Math.min(p, maxPage);
      });
    }
    setShowConfirm(false);
    setSelectedId(null);
  };

  return (
    <div className="admin-container">
      <h1 className="title">Gestion des organisateurs</h1>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Rechercher un organisateur..."
          value={filter}
          onChange={e => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Nom</th>
            <th onClick={() => handleSort("prenom")}>Prénom</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("phone")}>Téléphone</th>
            <th onClick={() => handleSort("status")}>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr><td colSpan={6}>Aucun organisateur trouvé.</td></tr>
          ) : (
            paginated.map(o => (
              <tr key={o.id} className="table-row">
                <td>{o.name}</td><td>{o.prenom}</td><td>{o.email}</td><td>{o.phone}</td>
                <td><span className={`status ${o.status.toLowerCase()}`}>{o.status}</span></td>
                <td>
                  <button className="btn edit" onClick={() => alert("Modifier non implémenté")}>Modifier</button>
                  <button className="btn delete" onClick={() => handleDelete(o.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="btn-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          ← Précédent
        </button>

        <span>Page {currentPage} / {totalPages}</span>

        <button
          className="btn-nav"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Suivant →
        </button>
      </div>

      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Confirmer la suppression ?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete}>Oui</button>
              <button onClick={() => setShowConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
