"use client"

import { User } from "lucide-react"

interface DemographicsSectionProps {
  sex: string
  ageRange: string
  onChange: (field: string, value: string) => void
}

export function DemographicsSection({ sex, ageRange, onChange }: DemographicsSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6b5ce7]/10">
          <User className="h-5 w-5 text-[#6b5ce7]" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Demographics</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Sex</label>
          <div className="relative">
            <select
              value={sex}
              onChange={(e) => onChange("sex", e.target.value)}
              className="w-full appearance-none rounded-xl bg-muted/60 px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/30"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Age Range</label>
          <div className="relative">
            <select
              value={ageRange}
              onChange={(e) => onChange("ageRange", e.target.value)}
              className="w-full appearance-none rounded-xl bg-muted/60 px-4 py-3.5 pr-10 text-sm font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/30"
            >
              <option value="18-24">18-24</option>
              <option value="25-29">25-29</option>
              <option value="30-34">30-34</option>
              <option value="35-39">35-39</option>
              <option value="40-44">40-44</option>
              <option value="45-49">45-49</option>
              <option value="50-54">50-54</option>
              <option value="55-59">55-59</option>
              <option value="60-64">60-64</option>
              <option value="65-69">65-69</option>
              <option value="70-74">70-74</option>
              <option value="75-79">75-79</option>
              <option value="80+">80+</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </div>
    </section>
  )
}
