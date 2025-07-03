"use client";

import React, { useState, useEffect } from "react";
import styles from "./Notifications.module.css";

type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Nouvelle inscription utilisateur",
    message: "Un nouvel utilisateur vient de s'inscrire sur la plateforme.",
    date: "2025-06-15 10:00",
    read: false,
  },
  {
    id: 2,
    title: "Mise à jour système",
    message: "La plateforme sera en maintenance demain de 2h à 4h.",
    date: "2025-06-14 08:30",
    read: true,
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // Marquer une notification comme lue
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Supprimer une notification
  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Marquer toutes comme lues
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestion des notifications</h1>

      <div className={styles.actions}>
        <button className={styles.markAllBtn} onClick={markAllAsRead} disabled={notifications.every(n => n.read)}>
          Marquer toutes comme lues
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className={styles.emptyMessage}>Aucune notification pour le moment.</p>
      ) : (
        <ul className={styles.notificationList}>
          {notifications.map(({ id, title, message, date, read }) => (
            <li
              key={id}
              className={`${styles.notification} ${read ? styles.read : styles.unread}`}
              onClick={() => !read && markAsRead(id)}
              tabIndex={0}
              role="button"
              aria-pressed={read}
              aria-label={`Notification: ${title} - ${read ? "lue" : "non lue"}`}
            >
              <div className={styles.header}>
                <h3 className={styles.titleNotif}>{title}</h3>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(id);
                  }}
                  aria-label="Supprimer notification"
                >
                  &times;
                </button>
              </div>
              <p className={styles.message}>{message}</p>
              <span className={styles.date}>{new Date(date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
