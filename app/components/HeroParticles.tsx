'use client'

import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function HeroParticles() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (_container?: unknown) => {}, [])

  if (!init) return null

  return (
    <Particles
      id="hero-particles"
      particlesLoaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab',
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
          },
          modes: {
            grab: {
              distance: 160,
              links: { opacity: 0.6 },
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 3,
            },
          },
        },
        particles: {
          color: {
            value: ['#5A72ED', '#3D52C4', '#C7D4FF', '#1A2580'],
          },
          links: {
            color: '#5A72ED',
            distance: 130,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: { default: 'bounce' },
            random: true,
            speed: 0.7,
            straight: false,
          },
          number: {
            density: { enable: true, width: 600 },
            value: 50,
          },
          opacity: {
            value: { min: 0.2, max: 0.6 },
            animation: {
              enable: true,
              speed: 0.8,
              sync: false,
            },
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1.5, max: 3.5 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
