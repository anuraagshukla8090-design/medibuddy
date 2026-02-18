"use client"

import { Apple } from "lucide-react"

interface DietSectionProps {
  fruitServings: number
  vegetableServings: number
  friedFoodServings: number
  onChange: (field: string, value: number) => void
}

export function DietSection({ fruitServings, vegetableServings, friedFoodServings, onChange }: DietSectionProps) {
  const sliders = [
    { label: "Fruit (servings/month)", field: "fruitServings", value: fruitServings, max: 60 },
    { label: "Vegetables (servings/month)", field: "vegetableServings", value: vegetableServings, max: 60 },
    { label: "Fried Food (servings/month)", field: "friedFoodServings", value: friedFoodServings, max: 60 },
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
          <Apple className="h-5 w-5 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Diet</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {sliders.map((slider) => (
          <div key={slider.field} className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">{slider.label}</label>
            <div className="space-y-1">
              <span className="block text-center text-sm font-bold text-[#ef4444]">{slider.value}</span>
              <input
                type="range"
                min={0}
                max={slider.max}
                value={slider.value}
                onChange={(e) => onChange(slider.field, Number(e.target.value))}
                className="slider-red w-full cursor-pointer"
                aria-label={slider.label}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
