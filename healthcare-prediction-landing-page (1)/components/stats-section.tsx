"use client"

const stats = [
  { value: "98.5%", label: "Prediction Accuracy" },
  { value: "50K+", label: "Health Reports Generated" },
  { value: "200+", label: "Diseases Covered" },
  { value: "24/7", label: "Monitoring Available" },
]

export function StatsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl bg-primary/5 border border-primary/10 p-10 lg:p-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-bold text-primary">{value}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
