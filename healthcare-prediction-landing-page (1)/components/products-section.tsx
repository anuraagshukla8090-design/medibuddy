"use client"

import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Get started with basic health predictions",
    features: [
      "5 Predictions per month",
      "Basic symptom analysis",
      "Health risk overview",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$19",
    period: "/month",
    description: "Advanced predictions for health-conscious individuals",
    features: [
      "Unlimited predictions",
      "Advanced AI diagnostics",
      "Real-time health monitoring",
      "Priority support",
      "Detailed health reports",
      "Family health tracking",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "Complete health management for organizations",
    features: [
      "Everything in Professional",
      "Custom AI models",
      "API access",
      "Dedicated account manager",
      "HIPAA compliance",
      "Team analytics dashboard",
    ],
    highlighted: false,
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl text-balance">
            Choose Your Health Plan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Start with our free tier and upgrade as you need more advanced health insights.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 transition-all ${
                plan.highlighted
                  ? "border-primary bg-card shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <button
                className={`mt-6 w-full rounded-lg py-3 text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                Get Started
              </button>
              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
