"use client"

import { Dumbbell, Minus, Plus } from "lucide-react"

interface LifestyleSectionProps {
  exercise: string
  smoking: string
  drinksPerWeek: number
  onChange: (field: string, value: string | number) => void
}

export function LifestyleSection({ exercise, smoking, drinksPerWeek, onChange }: LifestyleSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
          <Dumbbell className="h-5 w-5 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Lifestyle</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">{"Regular Exercise?"}</label>
          <div className="relative">
            <select
              value={exercise}
              onChange={(e) => onChange("exercise", e.target.value)}
              className="w-full appearance-none rounded-xl bg-muted/60 px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/30"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">{"Smoking History?"}</label>
          <div className="relative">
            <select
              value={smoking}
              onChange={(e) => onChange("smoking", e.target.value)}
              className="w-full appearance-none rounded-xl bg-muted/60 px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/30"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Drinks per week</label>
          <div className="flex items-center rounded-xl bg-muted/60">
            <input
              type="number"
              value={drinksPerWeek}
              onChange={(e) => onChange("drinksPerWeek", Number(e.target.value))}
              className="w-full flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-foreground outline-none"
              min={0}
              max={50}
            />
            <button
              type="button"
              onClick={() => onChange("drinksPerWeek", Math.max(0, drinksPerWeek - 1))}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Decrease drinks"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange("drinksPerWeek", Math.min(50, drinksPerWeek + 1))}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Increase drinks"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
