"use client"

import { SidebarIcons } from "./sidebar-icons"
import { PredictionForm } from "./prediction-form"
import { DashboardMockup } from "./dashboard-mockup"

export function HeroSection() {
  return (
    <section
      id="overview"
      className="relative min-h-screen pt-24"
    >
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(91,164,181,0.08)_0%,_transparent_60%)]" />

      <div className="mx-auto flex max-w-7xl items-start gap-6 px-6 py-12 lg:py-20">
        {/* Left sidebar icons */}
        <SidebarIcons />

        {/* Main hero content */}
        <div className="flex flex-1 flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text + Form */}
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">AI-Powered Predictions</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="text-balance">
                {"Predict Your Health Risks, "}
                <span className="text-primary">Plan Your Future.</span>
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Our AI analyzes your symptoms and health data to provide accurate
              disease predictions and personalized health insights.
            </p>
            <PredictionForm />
            {/* Trust badges */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-xs font-medium text-primary-foreground"
                      style={{
                        backgroundColor: ["#5ba4b5", "#7bc4d4", "#3d8a9c", "#a8dae5"][i],
                      }}
                    >
                      {["A", "B", "C", "D"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">10k+</span> users trust us
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="w-full lg:w-auto">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
