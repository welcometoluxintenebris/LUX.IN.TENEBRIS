import { useState, useEffect } from 'react'

type Scene = 'landing' | 'welcome'

// Sequence of lines shown after the welcome title
const LOADING_LINES = [
  'Loading experience...',
  'Calibrating the darkness...',
  'Ready for it?',
]

function FogBackground({ rushing }: { rushing: boolean }) {
  return (
    <>
      <div className="fog-layer fog-a" style={rushing ? { transform: 'scale(6)', transition: 'transform 1.6s cubic-bezier(0.4,0,1,1)', opacity: 0.9 } : undefined} />
      <div className="fog-layer fog-b" style={rushing ? { transform: 'scale(7)', transition: 'transform 1.4s cubic-bezier(0.4,0,1,1)', opacity: 0.8 } : undefined} />
      <div className="fog-layer fog-c" style={rushing ? { transform: 'scale(8)', transition: 'transform 1.8s cubic-bezier(0.4,0,1,1)', opacity: 1.0 } : undefined} />
      <div className="fog-layer fog-d" style={rushing ? { transform: 'scale(5)', transition: 'transform 2.0s cubic-bezier(0.4,0,1,1)', opacity: 0.7 } : undefined} />
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
        transition: 'opacity 0.4s ease',
        zIndex: 10,
      }}
    >
      <div className="landing-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(11px, 1.1vw, 13px)',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          margin: 0,
        }}>
          Limited access
        </p>
        <h1 style={{
          fontFamily: "'Gloock', serif",
          fontWeight: 400,
          fontSize: 'clamp(38px, 6vw, 82px)',
          color: 'rgba(255,255,255,0.92)',
          margin: 0,
          letterSpacing: '-0.01em',
          textAlign: 'center',
          lineHeight: 1.1,
        }}>
          The night<br />
          <span style={{ color: 'rgba(255,255,255,0.42)' }}>awaits.</span>
        </h1>
      </div>

      <div className="landing-content" style={{ animationDelay: '0.6s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <button className="btn-activate" onClick={onActivate}>
          Activate your pass
        </button>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(11px, 1vw, 12px)',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.20)',
          margin: 0,
          textTransform: 'uppercase',
        }}>
          One-time access · Non-transferable
        </p>
      </div>
    </div>
  )
}

function WelcomePage() {
  const [titleVisible, setTitleVisible] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    // Title fades in after a brief pause
    const t0 = setTimeout(() => setTitleVisible(true), 300)

    // Loading lines appear one by one starting at 5s
    const timers = LOADING_LINES.map((_, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, 5000 + i * 2200)
    )

    return () => {
      clearTimeout(t0)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0px',
      zIndex: 10,
    }}>
      {/* Main welcome title */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        opacity: titleVisible ? 1 : 0,
        transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1.8s cubic-bezier(0.16,1,0.3,1), transform 1.8s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(10px, 1vw, 12px)',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
          margin: 0,
        }}>
          Welcome to
        </p>
        <h1 style={{
          fontFamily: "'Gloock', serif",
          fontWeight: 400,
          fontSize: 'clamp(42px, 7vw, 96px)',
          color: 'rgba(255,255,255,0.95)',
          margin: 0,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          lineHeight: 1.0,
        }}>
          Lux in <span style={{ color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>Tenebris</span>
        </h1>
      </div>

      {/* Loading lines container — holds space even when empty */}
      <div style={{
        marginTop: '72px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        minHeight: `${LOADING_LINES.length * 44}px`,
      }}>
        {LOADING_LINES.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(12px, 1.2vw, 15px)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: i === visibleLines[visibleLines.length - 1]
                ? 'rgba(255,255,255,0.70)'
                : 'rgba(255,255,255,0.28)',
              margin: 0,
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1), color 0.8s ease',
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [scene, setScene] = useState<Scene>('landing')
  const [rushing, setRushing] = useState(false)
  const [landingFading, setLandingFading] = useState(false)
  // White fog rush overlay
  const [fogOverlay, setFogOverlay] = useState(0)
  // Final black overlay before welcome
  const [blackOverlay, setBlackOverlay] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)

  const handleActivate = () => {
    // 1. Fade out landing text immediately
    setLandingFading(true)
    // 2. Fog starts rushing toward camera
    setTimeout(() => setRushing(true), 100)
    // 3. White-fog overlay washes in as fog fills screen
    setTimeout(() => setFogOverlay(1), 400)
    // 4. Black closes over the white
    setTimeout(() => setBlackOverlay(1), 1200)
    // 5. Switch scene while black
    setTimeout(() => {
      setScene('welcome')
      setShowWelcome(true)
    }, 1700)
    // 6. Black fades out revealing welcome
    setTimeout(() => setBlackOverlay(0), 1900)
    // 7. Clean up fog overlay
    setTimeout(() => setFogOverlay(0), 2000)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#030305',
    }}>
      <FogBackground rushing={rushing} />

      {/* White fog rush overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(220,225,240,0.95) 0%, rgba(180,185,210,0.85) 60%, transparent 100%)',
        opacity: fogOverlay,
        transition: fogOverlay === 1 ? 'opacity 0.9s cubic-bezier(0.4,0,1,1)' : 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 30,
      }} />

      {/* Black curtain overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        opacity: blackOverlay,
        transition: blackOverlay === 1 ? 'opacity 0.6s ease' : 'opacity 0.8s ease',
        pointerEvents: blackOverlay > 0.5 ? 'all' : 'none',
        zIndex: 40,
      }} />

      {scene === 'landing' && <LandingPage onActivate={handleActivate} fading={landingFading} />}
      {scene === 'welcome' && showWelcome && <WelcomePage />}
    </div>
  )
}
