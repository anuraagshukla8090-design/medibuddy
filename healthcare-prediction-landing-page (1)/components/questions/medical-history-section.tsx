"use client"

import { FolderOpen } from "lucide-react"

interface MedicalHistorySectionProps {
  depression: string
  skinCancer: string
  arthritis: string
  otherCancer: string
  onChange: (field: string, value: string) => void
}

export function MedicalHistorySection({
  depression,
  skinCancer,
  arthritis,
  otherCancer,
  onChange,
}: MedicalHistorySectionProps) {
  const fields = [
    { label: "Depression?", field: "depression", value: depression },
    { label: "Skin Cancer?", field: "skinCancer", value: skinCancer },
    { label: "Arthritis?", field: "arthritis", value: arthritis },
    { label: "Other Cancer?", field: "otherCancer", value: otherCancer },
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10">
          <FolderOpen className="h-5 w-5 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Medical History</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {fields.map((item) => (
          <div key={item.field} className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{item.label}</label>
            <div className="relative">
              <select
                value={item.value}
                onChange={(e) => onChange(item.field, e.target.value)}
                className="w-full appearance-none rounded-xl bg-muted/60 px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/30"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
