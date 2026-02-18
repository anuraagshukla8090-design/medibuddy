"use client"

import { Stethoscope } from "lucide-react"

interface HealthStatusSectionProps {
  generalHealth: string
  lastCheckup: string
  onChange: (field: string, value: string) => void
}

export function HealthStatusSection({ generalHealth, lastCheckup, onChange }: HealthStatusSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6b5ce7]/10">
          <Stethoscope className="h-5 w-5 text-[#6b5ce7]" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Health Status</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">General Health</label>
          <div className="relative">
            <select
              value={generalHealth}
              onChange={(e) => onChange("generalHealth", e.target.value)}
              className="w-full appearance-none rounded-xl bg-muted/60 px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/30"
            >
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Last Medical Checkup</label>
          <div className="relative">
            <select
              value={lastCheckup}
              onChange={(e) => onChange("lastCheckup", e.target.value)}
              className="w-full appearance-none rounded-xl bg-muted/60 px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/30"
            >
              <option value="Within the past year">Within the past year</option>
              <option value="Within the past 2 years">Within the past 2 years</option>
              <option value="Within the past 5 years">Within the past 5 years</option>
              <option value="5 or more years ago">5 or more years ago</option>
              <option value="Never">Never</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </div>
    </section>
  )
}
