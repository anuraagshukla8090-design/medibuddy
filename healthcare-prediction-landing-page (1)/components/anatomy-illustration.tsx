"use client"

export function AnatomyIllustration() {
  return (
    <div className="relative flex h-full min-h-[400px] items-center justify-center">
      {/* Background circle */}
      <div className="absolute h-72 w-72 rounded-full bg-secondary/60" />

      {/* Dotted pattern decoration */}
      <div className="absolute right-12 top-16 grid grid-cols-5 gap-1.5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      {/* Brain SVG */}
      <svg
        viewBox="0 0 200 160"
        className="relative z-10 h-56 w-64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brain outline */}
        <path
          d="M100 20C75 20 55 35 50 55C40 55 30 65 30 80C30 95 40 105 55 105C55 120 70 135 90 135H110C130 135 145 120 145 105C160 105 170 95 170 80C170 65 160 55 150 55C145 35 125 20 100 20Z"
          stroke="#5ba4b5"
          strokeWidth="2"
          fill="#d4eef5"
          opacity="0.6"
        />
        {/* Brain detail lines */}
        <path d="M100 20V135" stroke="#5ba4b5" strokeWidth="1.5" opacity="0.4" />
        <path d="M70 50C80 60 90 55 100 65" stroke="#5ba4b5" strokeWidth="1.5" opacity="0.4" />
        <path d="M130 50C120 60 110 55 100 65" stroke="#5ba4b5" strokeWidth="1.5" opacity="0.4" />
        <path d="M55 80C70 75 85 85 100 80" stroke="#5ba4b5" strokeWidth="1.5" opacity="0.4" />
        <path d="M145 80C130 75 115 85 100 80" stroke="#5ba4b5" strokeWidth="1.5" opacity="0.4" />
        <path d="M65 105C80 100 90 110 100 105" stroke="#5ba4b5" strokeWidth="1.5" opacity="0.4" />
        <path d="M135 105C120 100 110 110 100 105" stroke="#5ba4b5" strokeWidth="1.5" opacity="0.4" />

        {/* Heart shape below brain */}
        <g transform="translate(60, 115) scale(0.5)">
          <path
            d="M40 20C40 10 30 0 20 0C10 0 0 10 0 20C0 40 40 70 40 70C40 70 80 40 80 20C80 10 70 0 60 0C50 0 40 10 40 20Z"
            stroke="#5ba4b5"
            strokeWidth="3"
            fill="#d4eef5"
            opacity="0.5"
          />
        </g>
      </svg>

      {/* 97% indicator - top right */}
      <div className="absolute right-4 top-8 z-20 flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-md border border-border">
        <span className="text-lg font-bold text-foreground">97%</span>
        <div className="flex flex-col gap-0.5">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <div className="h-1 w-6 rounded-full bg-primary/50" />
          <div className="h-1 w-4 rounded-full bg-primary/30" />
        </div>
      </div>

      {/* 84% indicator - left middle */}
      <div className="absolute bottom-28 left-0 z-20 flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-md border border-border">
        <span className="text-lg font-bold text-foreground">84%</span>
        <div className="flex flex-col gap-0.5">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <div className="h-1 w-5 rounded-full bg-primary/50" />
        </div>
      </div>

      {/* 45% indicator - bottom center */}
      <div className="absolute bottom-4 left-16 z-20 flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-md border border-border">
        <span className="text-lg font-bold text-foreground">45%</span>
        <div className="flex flex-col gap-0.5">
          <div className="h-1 w-8 rounded-full bg-primary" />
          <div className="h-1 w-6 rounded-full bg-primary/40" />
          <div className="h-1 w-3 rounded-full bg-primary/20" />
        </div>
      </div>

      {/* Small circle accent */}
      <div className="absolute right-20 bottom-40 h-3 w-3 rounded-full border-2 border-primary/40 bg-transparent" />
    </div>
  )
}
