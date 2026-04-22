'use client'

import { useInView } from 'react-intersection-observer'
import NumberFlow from '@number-flow/react'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedCounter({ value, prefix, suffix, className }: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <span ref={ref} className={className}>
      {prefix}
      <NumberFlow value={inView ? value : 0} />
      {suffix}
    </span>
  )
}
