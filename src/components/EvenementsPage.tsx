'use client';

import { useEffect, useState } from 'react';

function DrapeauFrance() {
  return (
    <span
      className="inline-flex w-12 h-8 ml-3 overflow-hidden rounded-sm shadow-sm align-middle"
      aria-label="Drapeau de la France"
    >
      <span className="w-1/3 h-full bg-blue-600" />
      <span className="w-1/3 h-full bg-white" />
      <span className="w-1/3 h-full bg-red-600" />
    </span>
  );
}




interface Event {
  title: string;
  date?: string;
  venue?: string;
  city?: string;
  url?: string;
  image?: string;
  price?: string;
  price_amount?: number;
  currency?: string;
}

export default function EvenementsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // États pour les filtres
  const [cityFilter, setCityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'gratuit' | 'payant'

  useEffect(() => {
    fetch('/evenements-50.json')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement du fichier JSON', error);
        setLoading(false);
      });
  }, []);

  // Extraction unique des villes pour le filtre
  const uniqueCities = Array.from(new Set(events.map(e => e.city).filter(Boolean)));

  // Fonction pour filtrer les événements selon les filtres sélectionnés
  const filteredEvents = events.filter(event => {
    const matchesCity = cityFilter ? event.city === cityFilter : true;
    const matchesPrice =
      priceFilter === 'all'
        ? true
        : priceFilter === 'gratuit'
        ? event.price === 'gratuit'
        : event.price !== 'gratuit';
    return matchesCity && matchesPrice;
  });

  return (
    <main className="p-8">
                <h1 className="text-4xl font-extrabold mb-8 tracking-tight flex items-center gap-2">
  <span
    style={{
      background: 'linear-gradient(90deg, #4f46e5, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    Événements en France
  </span>
  <DrapeauFrance />
</h1>


            {/* Filtres */}
                    {/* Filtres */}
<div className="mb-6 flex flex-wrap gap-8 items-center">
  <div className="flex items-center space-x-2">
    <label
      htmlFor="cityFilter"
      className="text-indigo-600 uppercase font-semibold text-xs tracking-wide whitespace-nowrap"
    >
      Filtrer par ville :
    </label>
    <select
      id="cityFilter"
      value={cityFilter}
      onChange={(e) => setCityFilter(e.target.value)}
      className="border rounded px-3 py-1 text-sm"
    >
      <option value="">Toutes les villes</option>
      {uniqueCities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

  <div className="flex items-center space-x-2">
    <label
      htmlFor="priceFilter"
      className="text-indigo-600 uppercase font-semibold text-xs tracking-wide whitespace-nowrap"
    >
      Filtrer par prix :
    </label>
    <select
      id="priceFilter"
      value={priceFilter}
      onChange={(e) => setPriceFilter(e.target.value)}
      className="border rounded px-3 py-1 text-sm"
    >
      <option value="all">Tous</option>
      <option value="gratuit">Gratuit</option>
      <option value="payant">Payant</option>
    </select>
  </div>
</div>


      {/* Contenu */}
      {loading ? (
        <p>Chargement...</p>
      ) : filteredEvents.length === 0 ? (
        <p>Aucun événement trouvé.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className="border p-4 rounded-lg shadow flex flex-col"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="mb-2 w-full h-32 object-cover rounded"
                />
              )}
              <h2 className="text-lg font-semibold mb-1">{event.title}</h2>
              {event.date && (
                <p className="text-sm mb-1 text-gray-600">
                  Date : {new Date(event.date).toLocaleString()}
                </p>
              )}
              {event.venue && event.city && (
                <p className="text-sm mb-1 text-gray-600">
                  Lieu : {event.venue}, {event.city}
                </p>
              )}
              {event.price && (
                <p className="text-sm mb-2">
                  Prix :{' '}
                  {event.price === 'gratuit'
                    ? 'Gratuit'
                    : `${event.price_amount} ${event.currency}`}
                </p>
              )}
              {event.url && (
                <a
                  href={event.url}
                  className="mt-auto text-blue-600 underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir l’événement
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
