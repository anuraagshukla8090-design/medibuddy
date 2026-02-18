"use client"

import { BarChart3, Minus, Plus } from "lucide-react"
import { useMemo } from "react"

interface PhysicalMetricsSectionProps {
  height: number
  weight: number
  onChange: (field: string, value: number) => void
}

export function PhysicalMetricsSection({ height, weight, onChange }: PhysicalMetricsSectionProps) {
  const bmi = useMemo(() => {
    if (height <= 0 || weight <= 0) return null
    const heightM = height / 100
    return weight / (heightM * heightM)
  }, [height, weight])

  const bmiCategory = useMemo(() => {
    if (!bmi) return ""
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }, [bmi])

  const bmiColor = useMemo(() => {
    if (!bmi) return "text-muted-foreground"
    if (bmi < 18.5) return "text-amber-500"
    if (bmi < 25) return "text-emerald-600"
    if (bmi < 30) return "text-amber-500"
    return "text-destructive"
  }, [bmi])

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8457e]/10">
          <BarChart3 className="h-5 w-5 text-[#e8457e]" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Physical Metrics</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">{"Height (cm)"}</label>
          <div className="flex items-center rounded-xl bg-muted/60">
            <input
              type="number"
              value={height}
              onChange={(e) => onChange("height", Number(e.target.value))}
              className="w-full flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-foreground outline-none"
              min={100}
              max={250}
            />
            <button
              type="button"
              onClick={() => onChange("height", Math.max(100, height - 1))}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Decrease height"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange("height", Math.min(250, height + 1))}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Increase height"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">{"Weight (kg)"}</label>
          <div className="flex items-center rounded-xl bg-muted/60">
            <input
              type="number"
              value={weight}
              onChange={(e) => onChange("weight", Number(e.target.value))}
              className="w-full flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-foreground outline-none"
              min={30}
              max={300}
            />
            <button
              type="button"
              onClick={() => onChange("weight", Math.max(30, weight - 1))}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Decrease weight"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange("weight", Math.min(300, weight + 1))}
              className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Increase weight"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {bmi && (
        <div className="rounded-xl bg-muted/60 px-6 py-4 text-center">
          <span className="text-sm text-muted-foreground">{"Your BMI: "}</span>
          <span className={`text-2xl font-bold ${bmiColor}`}>{bmi.toFixed(1)}</span>
          <span className={`ml-1 text-sm font-medium ${bmiColor}`}>{"("}{bmiCategory}{")"}</span>
        </div>
      )}
    </section>
  )
}
