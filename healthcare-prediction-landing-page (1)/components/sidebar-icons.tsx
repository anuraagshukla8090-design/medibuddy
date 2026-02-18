"use client"

import { Stethoscope, HeartPulse, Activity, Scan, ArrowRight } from "lucide-react"

const icons = [
  { Icon: Stethoscope, label: "Diagnosis" },
  { Icon: HeartPulse, label: "Heart Health" },
  { Icon: Activity, label: "Vitals" },
  { Icon: Scan, label: "Body Scan" },
]

export function SidebarIcons() {
  return (
    <aside className="hidden flex-col items-center gap-5 py-8 lg:flex">
      {icons.map(({ Icon, label }) => (
        <button
          key={label}
          className="group flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
      <div className="my-2 h-px w-6 bg-border" />
      <button
        className="group flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        aria-label="More options"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </aside>
  )
}
