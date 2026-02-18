"use client"

import { HeartPulse, BarChart3, Scan, Plus } from "lucide-react"

function DiagnosticChart() {
  return (
    <svg viewBox="0 0 200 60" className="h-full w-full" fill="none">
      <path
        d="M0 45 C20 40, 40 50, 60 35 C80 20, 100 30, 120 25 C140 20, 160 35, 180 15 C190 10, 195 20, 200 18"
        stroke="#5ba4b5"
        strokeWidth="2"
        fill="none"
      />
      {[30, 60, 90, 120, 150, 180].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={45 - Math.sin(i * 0.8) * 20}
          r="3"
          fill="#5ba4b5"
        />
      ))}
    </svg>
  )
}

function RiskChart() {
  return (
    <svg viewBox="0 0 200 60" className="h-full w-full" fill="none">
      <path
        d="M0 50 C30 45, 50 30, 80 35 C110 40, 130 15, 160 25 C180 30, 190 20, 200 22"
        stroke="#7bc4d4"
        strokeWidth="2"
        fill="none"
      />
      {[20, 55, 90, 125, 160, 190].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={50 - Math.sin(i * 1.1 + 0.5) * 25}
          r="3"
          fill="#7bc4d4"
        />
      ))}
    </svg>
  )
}

export function DashboardMockup() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg">
      {/* Browser chrome */}
      <div className="rounded-2xl border border-border bg-secondary shadow-xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 bg-primary/20 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-primary/40" />
          <div className="h-3 w-3 rounded-full bg-primary/30" />
          <div className="h-3 w-3 rounded-full bg-primary/20" />
        </div>

        <div className="flex">
          {/* Mini sidebar */}
          <div className="flex flex-col items-center gap-3 border-r border-border bg-secondary/50 px-3 py-4">
            <HeartPulse className="h-4 w-4 text-primary" />
            <BarChart3 className="h-4 w-4 text-primary/60" />
            <Scan className="h-4 w-4 text-primary/60" />
          </div>

          {/* Main content area */}
          <div className="flex flex-1 gap-3 p-4">
            {/* Left panel - circular gauge */}
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-card p-4">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e8f4f8"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#5ba4b5"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                  />
                </svg>
                <Plus className="absolute h-6 w-6 text-primary" />
              </div>
              {/* Mini bar chart */}
              <div className="mt-4 flex items-end gap-1.5">
                {[60, 40, 75, 50, 65, 45, 80].map((h, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-sm"
                    style={{
                      height: `${h * 0.3}px`,
                      backgroundColor: i % 2 === 0 ? "#5ba4b5" : "#c5dfe8",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right panels */}
            <div className="flex flex-1 flex-col gap-3">
              <div className="rounded-xl bg-card p-3">
                <p className="mb-2 text-xs font-semibold text-foreground">Diagnostic Insights</p>
                <div className="h-12">
                  <DiagnosticChart />
                </div>
              </div>
              <div className="rounded-xl bg-card p-3">
                <p className="mb-2 text-xs font-semibold text-foreground">Risk Probability</p>
                <div className="h-12">
                  <RiskChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
