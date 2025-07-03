import Link from 'next/link';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0ebe3]"> {/* beige clair en fond global */}
      {/* Navbar horizontale en haut */}
      <header className="bg-[#7a7156] text-[#f5f5f5] flex items-center justify-between px-8 py-4 shadow-md">
        {/* Logo / Home */}
        <Link
          href="/"
          className="text-2xl font-extrabold hover:text-[#a8987d] transition duration-300"
        >
          EVENTIFY
        </Link>

        {/* Boutons à droite */}
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-[#8b7f60] hover:bg-[#6b5e3c] transition duration-300 hover:scale-105"
          >
            Se connecter
          </Link>
          <Link
            href="/Signup"
            className="px-4 py-2 rounded-md bg-[#a8987d] hover:bg-[#7a7156] transition duration-300 hover:scale-105"
          >
            Créer un compte
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-md bg-[#6b5e3c] hover:bg-[#4f462a] transition duration-300 hover:scale-105"
          >
            À propos
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 p-6 bg-[#faf6f0] overflow-auto">
        {children}
      </main>
    </div>
  );
}
