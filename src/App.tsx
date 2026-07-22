import { useState, useEffect } from 'react'

type Scene = 'landing' | 'pass'

function FogBackground() {
  return (
    <>
      <div className="fog-layer fog-a" />
      <div className="fog-layer fog-b" />
      <div className="fog-layer fog-c" />
      <div className="fog-layer fog-d" />
    </>
  )
}

function LandingPage({ onActivate, fading }: { onActivate: () => void; fading: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '48px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        zIndex: 10,
      }}
    >
      <div className="landing-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(11px, 1.1vw, 13px)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            margin: 0,
          }}
        >
          Limited access
        </p>
        <h1
          style={{
            fontFamily: "'Gloock', serif",
            fontWeight: 400,
            fontSize: 'clamp(38px, 6vw, 82px)',
            color: 'rgba(255,255,255,0.92)',
            margin: 0,
            letterSpacing: '-0.01em',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          The night<br />
          <span style={{ color: 'rgba(255,255,255,0.42)' }}>awaits.</span>
        </h1>
      </div>

      <div
        className="landing-content"
        style={{ animationDelay: '0.6s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}
      >
        <button className="btn-activate" onClick={onActivate}>
          Activate your pass
        </button>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(11px, 1vw, 12px)',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.20)',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          One-time access · Non-transferable
        </p>
      </div>
    </div>
  )
}

function PassCard() {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()

  return (
    <div
      className="pass-card"
      style={{
        position: 'relative',
        width: 'clamp(300px, 90vw, 420px)',
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(24px)',
        padding: '48px 44px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', margin: '0 0 6px' }}>
            Event Pass
          </p>
          <p style={{ fontFamily: "'Gloock', serif", fontWeight: 400, fontSize: '22px', color: 'rgba(255,255,255,0.90)', margin: 0, letterSpacing: '-0.01em' }}>
            Noctua
          </p>
        </div>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <circle cx="7" cy="7" r="2.5" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

      {/* Pass details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Holder" value="Guest" />
          <Field label="Tier" value="Black" />
          <Field label="Date" value={dateStr} />
          <Field label="Access" value="Full" />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 6px, transparent 6px, transparent 12px)' }} />

      {/* Pass number */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', margin: 0 }}>
          Pass No.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '13px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
          #{Math.random().toString(36).slice(2, 8).toUpperCase()}
        </p>
      </div>

      {/* Active indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7fff8a', boxShadow: '0 0 8px #7fff8a', flexShrink: 0 }} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase', margin: 0 }}>
          Pass activated
        </p>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', margin: 0 }}>
        {label}
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '13px', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.78)', margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

function PassPage({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        zIndex: 10,
      }}
    >
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(10px, 1vw, 12px)',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          margin: 0,
          animationDelay: '0.4s',
        }}
        className="landing-content"
      >
        Welcome back
      </p>
      {visible && <PassCard />}
    </div>
  )
}

export default function App() {
  const [scene, setScene] = useState<Scene>('landing')
  const [fading, setFading] = useState(false)
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [showPass, setShowPass] = useState(false)

  const handleActivate = () => {
    setFading(true)
    // Fade landing content out + overlay in
    setTimeout(() => setOverlayOpacity(1), 50)
    // Switch scene at peak of overlay
    setTimeout(() => {
      setScene('pass')
      setOverlayOpacity(0)
    }, 850)
    // Reveal pass content after overlay fades
    setTimeout(() => {
      setShowPass(true)
    }, 1400)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#030305',
      }}
    >
      <FogBackground />

      {/* Transition overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000',
          opacity: overlayOpacity,
          transition: overlayOpacity === 1 ? 'opacity 0.6s ease' : 'opacity 0.7s ease',
          pointerEvents: overlayOpacity > 0.5 ? 'all' : 'none',
          zIndex: 50,
        }}
      />

      {scene === 'landing' && <LandingPage onActivate={handleActivate} fading={fading} />}
      {scene === 'pass' && <PassPage visible={showPass} />}
    </div>
  )
}