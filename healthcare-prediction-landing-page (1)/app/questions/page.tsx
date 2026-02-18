"use client"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DemographicsSection } from "@/components/questions/demographics-section"
import { PhysicalMetricsSection } from "@/components/questions/physical-metrics-section"
import { HealthStatusSection } from "@/components/questions/health-status-section"
import { LifestyleSection } from "@/components/questions/lifestyle-section"
import { DietSection } from "@/components/questions/diet-section"
import { MedicalHistorySection } from "@/components/questions/medical-history-section"
import { useRouter } from "next/navigation"

interface FormData {
  sex: string
  ageRange: string
  height: number
  weight: number
  generalHealth: string
  lastCheckup: string
  exercise: string
  smoking: string
  drinksPerWeek: number
  fruitServings: number
  vegetableServings: number
  friedFoodServings: number
  depression: string
  skinCancer: string
  arthritis: string
  otherCancer: string
}

export default function QuestionsPage() {
  const router= useRouter();
  const [formData, setFormData] = useState<FormData>({
    sex: "Female",
    ageRange: "18-24",
    height: 170,
    weight: 70,
    generalHealth: "Good",
    lastCheckup: "Within the past year",
    exercise: "Yes",
    smoking: "No",
    drinksPerWeek: 2,
    fruitServings: 30,
    vegetableServings: 20,
    friedFoodServings: 10,
    depression: "No",
    skinCancer: "No",
    arthritis: "No",
     otherCancer: "No",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSubmitStatus("idle")
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

   try {
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const data = await response.json()
  console.log("data from api",data)

  // 🚀 Redirect to dashboard
 

const params = new URLSearchParams({
  risk: String(data.risk_percent),
  category: String(data.risk_category),
  severity: String(data.severity_text),
  bmi: String(data.bmi),
  score: String(data.health_score),
  confidence: String(data.confidence),
  lifestyle: String(data.lifestyle_score),
  healthLevel: String(data.health_level),
  idealMin: String(data.ideal_weight_range?.min ?? ""),
  idealMax: String(data.ideal_weight_range?.max ?? ""),
  factors: data.risk_factors?.join(",") ?? "",
  recommendations: data.recommendations?.join("|") ?? ""
})

router.push(`/dashboard?${params.toString()}`)


router.push(`/dashboard?${params.toString()}`)



} catch (error) {
  console.error(error)
}

     finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Health Assessment</h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below to get an AI-powered health risk prediction.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-0">
          <div className="rounded-2xl bg-card p-6 shadow-sm sm:p-8">
            <div className="space-y-10">
              {/* Demographics */}
              <DemographicsSection
                sex={formData.sex}
                ageRange={formData.ageRange}
                onChange={handleChange}
              />

              <hr className="border-border" />

              {/* Physical Metrics */}
              <PhysicalMetricsSection
                height={formData.height}
                weight={formData.weight}
                onChange={(field, value) => handleChange(field, value)}
              />

              <hr className="border-border" />

              {/* Health Status */}
              <HealthStatusSection
                generalHealth={formData.generalHealth}
                lastCheckup={formData.lastCheckup}
                onChange={handleChange}
              />

              <hr className="border-border" />

              {/* Lifestyle */}
              <LifestyleSection
                exercise={formData.exercise}
                smoking={formData.smoking}
                drinksPerWeek={formData.drinksPerWeek}
                onChange={handleChange}
              />

              <hr className="border-border" />

              {/* Diet */}
              <DietSection
                fruitServings={formData.fruitServings}
                vegetableServings={formData.vegetableServings}
                friedFoodServings={formData.friedFoodServings}
                onChange={(field, value) => handleChange(field, value)}
              />

              <hr className="border-border" />

              {/* Medical History */}
              <MedicalHistorySection
                depression={formData.depression}
                skinCancer={formData.skinCancer}
                arthritis={formData.arthritis}
                otherCancer={formData.otherCancer}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Analyze My Health
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
                Analysis submitted successfully! Check the Diagnostics page for results.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
                Failed to connect to the server. Make sure your backend is running on localhost:5000.
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
