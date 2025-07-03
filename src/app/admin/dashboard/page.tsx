"use client";

import "./admin-dashboard.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Calendar, TicketCheck, Settings } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const stats = [
  {
    label: "Utilisateurs",
    value: 421,
    icon: <Users className="w-6 h-6 text-white" />,
    color: "bg-blue-600",
  },
  {
    label: "Événements",
    value: 94,
    icon: <Calendar className="w-6 h-6 text-white" />,
    color: "bg-green-600",
  },
  {
    label: "Billets validés",
    value: 321,
    icon: <TicketCheck className="w-6 h-6 text-white" />,
    color: "bg-yellow-500",
  },
  {
    label: "Catégories",
    value: 8,
    icon: <Settings className="w-6 h-6 text-white" />,
    color: "bg-gray-700",
  },
];

const chartData = [
  { name: "Jan", events: 12 },
  { name: "Fév", events: 18 },
  { name: "Mars", events: 10 },
  { name: "Avr", events: 22 },
  { name: "Mai", events: 16 },
  { name: "Juin", events: 30 },
];

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1>Dashboard Administrateur</h1>

      {/* Statistiques principales */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="card shadow-lg border border-gray-200">
            <div className="card-header">
              <div className="card-title">{stat.label}</div>
              <div className={`icon-circle ${stat.color}`}>{stat.icon}</div>
            </div>
            <div className="card-content">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Graphique des événements */}
      <div className="chart-card">
        <h2 className="chart-title">Nombre d'événements par mois</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Bar dataKey="events" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
