'use client'

import React from 'react'

interface MarqueeRowProps {
  children: React.ReactNode[]
  reverse?: boolean
  pauseOnHover?: boolean
  className?: string
  gap?: number
  speed?: string
}

export default function MarqueeRow({
  children,
  reverse = false,
  pauseOnHover = true,
  className = '',
  gap = 16,
  speed,
}: MarqueeRowProps) {
  const doubled = [...children, ...children]

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
    >
      <div
        className={`flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''} ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{ gap: `${gap}px`, width: 'max-content', ...(speed ? { animationDuration: speed } : {}) }}
      >
        {doubled.map((child, i) => (
          <div key={i} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
