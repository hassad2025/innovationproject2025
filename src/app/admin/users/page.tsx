"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./UsersAdmin.module.css";
import usersData from "@/data/users.json";

type User = typeof usersData[0];

function isValidUser(u: any): u is User {
  return (
    typeof u.id === "number" &&
    typeof u.nom === "string" &&
    typeof u.prenom === "string" &&
    typeof u.email === "string" &&
    typeof u.phone === "string" &&
    typeof u.password === "string" &&
    typeof u.status === "string" &&
    typeof u.role === "string"
  );
}

export default function AdminUsersPage() {
  // On charge directement les utilisateurs depuis usersData (fichier JSON)
  const [users, setUsers] = useState<User[]>(() =>
    usersData.filter(isValidUser)
  );
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof User | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});
  const [editError, setEditError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) =>
      (u.nom?.toLowerCase() ?? "").includes(filter.toLowerCase()) ||
      (u.prenom?.toLowerCase() ?? "").includes(filter.toLowerCase()) ||
      (u.email?.toLowerCase() ?? "").includes(filter.toLowerCase()) ||
      (u.phone?.toLowerCase() ?? "").includes(filter.toLowerCase())
    );
  }, [filter, users]);

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

  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  const handleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedId != null) {
      setUsers((prev) => prev.filter((u) => u.id !== selectedId));
      setShowPassword((prev) => {
        const copy = { ...prev };
        delete copy[selectedId];
        return copy;
      });
    }
    setShowConfirm(false);
    setSelectedId(null);
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleModify = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditingUser(user);
      setEditFormData(user);
      setEditError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveModification = () => {
    if (!editingUser) return;

    const { prenom, nom, email, phone, password, status, role } = editFormData;
    if (!prenom || !nom || !email || !phone || !password || !status || !role) {
      setEditError("Tous les champs sont obligatoires.");
      return;
    }

    const updated = { ...editingUser, ...editFormData } as User;
    setUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u))
    );
    setEditingUser(null);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.tableContainer}>
        <h1>Gestion des utilisateurs</h1>

        <input
          type="text"
          placeholder="Rechercher par nom, prénom, email, téléphone..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        />

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("prenom")}>Prénom</th>
              <th onClick={() => handleSort("nom")}>Nom</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th onClick={() => handleSort("phone")}>Téléphone</th>
              <th>Mot de passe</th>
              <th onClick={() => handleSort("status")}>Statut</th>
              <th onClick={() => handleSort("role")}>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8}>Aucun utilisateur trouvé.</td>
              </tr>
            ) : (
              paginated.map((u) => (
                <tr key={u.id}>
                  <td>{u.prenom}</td>
                  <td>{u.nom}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    {showPassword[u.id] ? u.password : "••••••••"}
                    <button
                      onClick={() => togglePasswordVisibility(u.id)}
                      style={{ marginLeft: 8 }}
                    >
                      {showPassword[u.id] ? "🙈" : "👁️"}
                    </button>
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[
                        u.status.toLowerCase()
                      ]}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>{u.role}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleModify(u.id)}>Modifier</button>
                      <button onClick={() => handleDelete(u.id)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Précédent
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Suivant
          </button>
        </div>

        {showConfirm && (
          <div className={styles["modal-backdrop"]}>
            <div className={styles.modal}>
              <p>Confirmer la suppression ?</p>
              <div className={styles["modal-actions"]}>
                <button onClick={confirmDelete}>Oui</button>
                <button onClick={() => setShowConfirm(false)}>Annuler</button>
              </div>
            </div>
          </div>
        )}

        {editingUser && (
          <div className={styles["modal-backdrop"]}>
            <div className={styles.modal}>
              <h2>Modifier utilisateur</h2>
              {editError && <p style={{ color: "red" }}>{editError}</p>}

              <label>
                Prénom:
                <input
                  name="prenom"
                  value={editFormData.prenom ?? ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Nom:
                <input
                  name="nom"
                  value={editFormData.nom ?? ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Email:
                <input
                  name="email"
                  type="email"
                  value={editFormData.email ?? ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Téléphone:
                <input
                  name="phone"
                  value={editFormData.phone ?? ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Mot de passe:
                <input
                  name="password"
                  type="password"
                  value={editFormData.password ?? ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Statut:
                <input
                  name="status"
                  value={editFormData.status ?? ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Rôle:
                <input
                  name="role"
                  value={editFormData.role ?? ""}
                  onChange={handleChange}
                />
              </label>

              <div className={styles["modal-actions"]}>
                <button onClick={saveModification}>Enregistrer</button>
                <button onClick={() => setEditingUser(null)}>Annuler</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
