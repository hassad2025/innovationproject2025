"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import users from "@/data/users.json";
import './Login.css';
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value.trim();
    const password = target.password.value.trim();

    // Cherche utilisateur avec email et mot de passe
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setError("");

      // Redirection selon le rôle
      switch (user.role.toLowerCase()) {
        case "organisateur":
          router.push("/organisateurs");
          break;
        case "administrateur":
          router.push("/admin");
          break;
        case "utilisateur":
          router.push("/users");
          break;
        default:
          // Si rôle inconnu, on peut rediriger vers une page générique ou erreur
          router.push("/dashboard");
      }
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2>Connexion</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Entrez votre email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button">
              Se connecter
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        /* (même CSS que précédemment, pour la simplicité je ne le recopie pas) */
      `}</style>
    </>
  );
};

export default LoginPage;
