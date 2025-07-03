"use client";

import React, { useState, FormEvent } from "react";
import "./SignupPage.css";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "utilisateur" | "organisateur";
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "utilisateur",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Optionnel : validation simple des mots de passe
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        // Réinitialiser le formulaire après succès
        setFormData({
          prenom: "",
          nom: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "utilisateur",
        });
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      alert("Votre formulaire a été envoyé.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="svg-container">
          <img
            src="https://svgsilh.com/png-512/146299.png"
            alt="Carte de France"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmation</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="role">Rôle</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="utilisateur">Utilisateur</option>
              <option value="organisateur">Organisateur</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;



