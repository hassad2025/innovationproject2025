"use client";

import React, { useState } from "react";
import styles from "./Settings.module.css";

type SettingsData = {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  enableNotifications: boolean;
  enableUserRegistration: boolean;
  theme: "light" | "dark";
};

const initialSettings: SettingsData = {
  siteName: "Eventify",
  contactEmail: "contact@eventify.com",
  contactPhone: "+33 00 00 00 00",
  address: "75020, France",
  enableNotifications: true,
  enableUserRegistration: true,
  theme: "light",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = () => {
    if (!settings.siteName.trim()) return "Le nom du site est requis.";
    if (!settings.contactEmail.match(/^\S+@\S+\.\S+$/))
      return "L'adresse email est invalide.";
    if (!settings.contactPhone.trim())
      return "Le numéro de téléphone est requis.";
    if (!settings.address.trim()) return "L'adresse est requise.";
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMessage(error);
      setStatusMessage(null);
      return;
    }
    setErrorMessage(null);

    setTimeout(() => {
      setStatusMessage("Paramètres enregistrés avec succès.");
    }, 800);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setErrorMessage(null);
    setStatusMessage(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Paramètres de la plateforme</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nom du site
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            placeholder="Nom de la plateforme"
            required
          />
        </label>

        <label className={styles.label}>
          Email de contact
          <input
            type="email"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            placeholder="contact@exemple.com"
            required
          />
        </label>

        <label className={styles.label}>
          Téléphone
          <input
            type="tel"
            name="contactPhone"
            value={settings.contactPhone}
            onChange={handleChange}
            placeholder="+33 00 00 00 00"
            required
          />
        </label>

        <label className={styles.label}>
          Adresse
          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
            placeholder="Paris 75020"
            rows={3}
            required
          />
        </label>

        <fieldset className={styles.checkboxGroup}>
          <legend>Fonctionnalités</legend>

          <label
            className={styles.label}
            style={{
              flexDirection: "row",
              gap: 8,
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
              marginBottom: 8,
            }}
          >
            <input
              type="checkbox"
              name="enableNotifications"
              checked={settings.enableNotifications}
              onChange={handleChange}
            />
            Activer les notifications
          </label>

          <label
            className={styles.label}
            style={{
              flexDirection: "row",
              gap: 8,
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
              marginBottom: 8,
            }}
          >
            <input
              type="checkbox"
              name="enableUserRegistration"
              checked={settings.enableUserRegistration}
              onChange={handleChange}
            />
            Autoriser l'inscription des utilisateurs
          </label>
        </fieldset>

        <label className={styles.label}>
          Thème
          <select name="theme" value={settings.theme} onChange={handleChange}>
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </label>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {statusMessage && <p className={styles.success}>{statusMessage}</p>}

        <div className={styles.buttons}>
          <button type="submit" className={styles.saveBtn}>
            Enregistrer
          </button>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={handleReset}
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
}


