"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

const diagnosticData = [
  { month: "Jan", value: 15 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 40 },
  { month: "Apr", value: 55 },
  { month: "Thu", value: 50 },
  { month: "Fri", value: 70 },
  { month: "Sat", value: 85 },
]

const healthTrendsData = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 55 },
  { month: "Wed", value: 60 },
  { month: "Thu", value: 50 },
  { month: "Fri", value: 70 },
  { month: "Sat", value: 80 },
]

export function DiagnosticCharts() {
  return (
    <div className="flex flex-col gap-6">
      {/* Diagnostic Probability Chart */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-foreground">
            Diagnostic Probability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={diagnosticData}>
                <defs>
                  <linearGradient id="diagGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5ba4b5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5ba4b5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#c5dfe8"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#5ba4b5"
                  strokeWidth={2.5}
                  fill="url(#diagGradient)"
                  dot={{ r: 3, fill: "#5ba4b5", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#5ba4b5", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Health Trends Chart */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-foreground">
            Health Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthTrendsData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5ba4b5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5ba4b5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#c5dfe8"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#5ba4b5"
                  strokeWidth={2.5}
                  fill="url(#healthGradient)"
                  dot={{ r: 3, fill: "#5ba4b5", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#5ba4b5", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
