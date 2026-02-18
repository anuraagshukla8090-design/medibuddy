"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

const availableSymptoms = [
  "Headache",
  "Dizziness",
  "Nausea",
  "Fatigue",
  "Chest Pain",
  "Shortness of Breath",
  "Fever",
  "Joint Pain",
  "Insomnia",
  "Muscle Weakness",
  "Blurred Vision",
  "Numbness/Tingling",
  "High Blood Pressure",
  "Irregular Heartbeat",
  "Memory Loss",
  "Anxiety",
  "Swelling",
  "Skin Rash",
]

export function SymptomChecker() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [genderType, setGenderType] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    "Disorientation",
    "Dizziness",
    "Insomnia",
    "Headache",
    "Fatigue",
  ])
  const [symptomDropdownOpen, setSymptomDropdownOpen] = useState(false)

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== symptom))
  }

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms((prev) => [...prev, symptom])
    }
    setSymptomDropdownOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-foreground">Symptom Checker</h2>

      {/* Age */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">Age</label>
        <Input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="h-11 rounded-lg border-border bg-card"
        />
      </div>

      {/* Gender selectors */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground">Gender</label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-border bg-card px-3 pr-10 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground">Gender</label>
          <div className="relative">
            <select
              value={genderType}
              onChange={(e) => setGenderType(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-border bg-card px-3 pr-10 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Symptoms selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">Select Symptoms</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setSymptomDropdownOpen(!symptomDropdownOpen)}
            className="flex h-11 w-full items-center justify-between rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <span>Select Symptoms</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {symptomDropdownOpen && (
            <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
              {availableSymptoms
                .filter((s) => !selectedSymptoms.includes(s))
                .map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => addSymptom(symptom)}
                    className="flex w-full px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    {symptom}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Selected symptom tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedSymptoms.map((symptom) => (
            <span
              key={symptom}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              {symptom}
              <button
                type="button"
                onClick={() => removeSymptom(symptom)}
                className="rounded-full transition-colors hover:bg-primary-foreground/20"
                aria-label={`Remove ${symptom}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="button"
        className="h-12 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
      >
        Sign In
      </button>
    </div>
  )
}
