export default function GradientOrbs() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, var(--orb-1-color) 0%, transparent 70%)',
          animationDelay: '0ms',
        }}
      />
      <div
        className="absolute top-1/2 -left-56 w-[500px] h-[500px] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, var(--orb-2-color) 0%, transparent 70%)',
          animationDelay: '1400ms',
        }}
      />
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, var(--orb-3-color) 0%, transparent 70%)',
          animationDelay: '2800ms',
        }}
      />
    </div>
  )
}
