"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

export function PredictionForm() {
  const router = useRouter()
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [symptoms, setSymptoms] = useState("")

  return (
    <div className="mt-8 w-full max-w-lg">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <div className="relative">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full appearance-none rounded-lg border border-border bg-card px-4 py-3 pr-10 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
        <input
          type="text"
          placeholder="Enter Symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={() => router.push("/questions")}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Predict Now
        </button>
      </div>
    </div>
  )
}
