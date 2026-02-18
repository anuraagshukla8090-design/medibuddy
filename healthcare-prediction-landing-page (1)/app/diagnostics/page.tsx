"use client"

import { DashboardNavbar } from "@/components/dashboard-navbar"
import { AnatomyIllustration } from "@/components/anatomy-illustration"
import { SymptomChecker } from "@/components/symptom-checker"
import { DiagnosticCharts } from "@/components/diagnostic-charts"

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-6 text-xl font-semibold text-foreground">Main Dashboard</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left: Main card with anatomy + symptom checker */}
          <div className="flex-1">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Anatomy illustration */}
                <AnatomyIllustration />

                {/* Symptom checker form */}
                <SymptomChecker />
              </div>
            </div>
          </div>

          {/* Right: Charts sidebar */}
          <div className="w-full lg:w-80 xl:w-96">
            <DiagnosticCharts />
          </div>
        </div>
      </main>
    </div>
  )
}
