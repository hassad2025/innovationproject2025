'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { BarChart2 } from "lucide-react"

const events = [
  { title: "Conférence IA", sold: 25, date: "2025-07-12" },
  { title: "Concert Afrobeat", sold: 178, date: "2025-08-01" },
  { title: "Startup Meetup", sold: 60, date: "2025-09-15" },
]

const COLORS = ['#4f46e5', '#10b981', '#ef4444']  // indigo-600, green-500, red-500

export default function StatsOverview() {
  const totalTickets = events.reduce((sum, e) => sum + e.sold, 0)

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
                  data={events}
                  dataKey="sold"
                  nameKey="title"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {events.map((_, index) => (
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
              <LineChart data={events} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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

