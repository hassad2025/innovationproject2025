'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { BarChart2 } from "lucide-react"
import { Event } from "@/types/event"

type StatsOverviewProps = {
  events: Event[]
}

const COLORS = ['#4f46e5', '#10b981', '#ef4444']  // indigo-600, green-500, red-500

export default function StatsOverview({ events }: StatsOverviewProps) {
  const totalTickets = events.reduce((sum, e) => sum + e.billetsVendus, 0)

  // Préparer les données pour les graphiques (par exemple, par titre et billets vendus)
  const chartData = events.map(e => ({
    title: e.titre,
    sold: e.billetsVendus,
    date: e.date,
  }))

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Statistiques</h2>
        <BarChart2 className="w-5 h-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-600">🎟️ Billets vendus : <strong>{totalTickets}</strong></p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Pie Chart */}
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="sold"
                  nameKey="title"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sold" stroke="#4f46e5" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

