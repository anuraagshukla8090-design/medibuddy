"use client"

import { Brain, Shield, Activity, Clock } from "lucide-react"

const features = [
  {
    Icon: Brain,
    title: "AI-Powered Diagnostics",
    description:
      "Advanced machine learning models analyze your symptoms and health data for accurate disease predictions.",
  },
  {
    Icon: Shield,
    title: "Privacy First",
    description:
      "Your health data is encrypted end-to-end. We never share your personal information with third parties.",
  },
  {
    Icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Track your health metrics in real-time with continuous monitoring and instant risk alerts.",
  },
  {
    Icon: Clock,
    title: "Early Detection",
    description:
      "Identify potential health risks before they become serious, giving you time to take preventive action.",
  },
]

export function FeaturesSection() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl text-balance">
            Smarter Health Predictions with Advanced AI
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our platform combines cutting-edge artificial intelligence with medical expertise
            to deliver personalized health insights.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
