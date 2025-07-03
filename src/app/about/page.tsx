import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
        <h2>À propos de Eventify</h2>
        <p>Bienvenue sur <strong>Eventify</strong>, la solution tout-en-un pour organiser, découvrir et vivre des événements inoubliables !</p>
        
        <h3>Notre mission</h3>
        <p>
          Chez <strong>Eventify</strong>, notre objectif est de faciliter la rencontre entre organisateurs et participants. Que vous soyez un professionnel de l’événementiel ou un passionné cherchant à partager vos idées, nous vous offrons une plateforme simple, sécurisée et intuitive pour gérer vos événements en toute sérénité.
        </p>
        
        <h3>Pourquoi choisir Eventify ?</h3>
        <ul>
          <li><strong>Sécurité avant tout :</strong> Nous veillons à ce que chaque utilisateur soit vérifié et chaque événement soit authentique.</li>
          <li><strong>Facilité d’utilisation :</strong> Organisez vos événements en quelques clics et accédez à un tableau de bord intuitif pour une gestion simplifiée.</li>
          <li><strong>Une expérience personnalisée :</strong> Grâce à des recommandations adaptées à vos préférences et votre localisation, nous vous offrons des événements qui correspondent à vos attentes.</li>
        </ul>
        
        <h3>Fonctionnalités clés de Eventify</h3>
        <ul>
          <li>Création d’événements en quelques clics</li>
          <li>Système de billetterie sécurisé pour gérer vos participants</li>
          <li>Vérification des organisateurs et participants pour garantir la fiabilité</li>
          <li>Recommandations personnalisées en fonction de vos centres d’intérêt et de votre localisation</li>
          <li>Interface intuitive pour une gestion sans stress de vos événements</li>
        </ul>
        
        <h3>Rejoignez la communauté Eventify !</h3>
        <p>
          Si vous avez des questions, des suggestions ou si vous souhaitez nous rejoindre en tant que partenaire, n’hésitez pas à nous contacter à <a href="mailto:email">email</a>.
        </p>
        <p>
          Suivez-nous sur nos réseaux sociaux pour ne rien manquer des dernières actualités et événements !
        </p>
      </section>
    </div>
  );
};

export default About;
