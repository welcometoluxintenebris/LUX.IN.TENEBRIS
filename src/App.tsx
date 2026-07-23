import { useState, useEffect, useRef, type RefObject } from 'react'
//import videoSrc from "public/videoplayback.mp4";

type Scene = 'landing' | 'welcome'

const LOADING_LINES = [
  'Loading experience...',
  'Calibrating the darkness...',
  'Ready for it?',
]

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

const NUM_FRAMES = 7
const FRAME_DURATION = 0.78

function TunnelTransition({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 30, overflow: 'hidden' }}>
      {/* Fog base */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(195,200,220,0.90) 0%, rgba(130,138,165,0.88) 50%, rgba(40,44,58,0.97) 100%)',
        animation: 'fog-fill 0.55s cubic-bezier(0.4,0,0.6,1) forwards',
      }} />

      {/* Rectangular frames zooming outward */}
      {Array.from({ length: NUM_FRAMES }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '100vh',
            marginTop: '-50vh',
            marginLeft: '-50vw',
            border: '1px solid rgba(255,255,255,0.28)',
            boxShadow: '0 0 12px 2px rgba(210,215,235,0.10) inset',
            animation: `rect-rush ${FRAME_DURATION}s linear infinite`,
            animationDelay: `${-(i * (FRAME_DURATION / NUM_FRAMES))}s`,
            transformOrigin: 'center',
          }}
        />
      ))}

      {/* Dark vignette — corners stay dark to reinforce depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.70) 100%)',
        animation: 'vignette-pulse 0.5s ease-in-out infinite',
        animationDelay: '0.4s',
      }} />
    </div>
  )
}

function LandingPage({ onActivate, fading }: { onActivate: () => void; fading: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '48px',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.35s ease',
      zIndex: 10,
    }}>
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
          One-time access · Non-transferable · Activate sound
        </p>
      </div>
    </div>
  )
}

function VideoScreen({ visible,
  videoRef,
}: {
  visible: boolean
  videoRef: RefObject<HTMLVideoElement | null>
}) {
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      backgroundColor: '#000',
      opacity: visible ? 1 : 0,
      transition: 'opacity 1.6s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: visible ? 'all' : 'none',
    }}>
      <video
        ref={videoRef}
        loop
        playsInline
        controls
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        {/* Reemplaza con la ruta a tu video, ej: src="/video.mp4" */}
        <source src={`${import.meta.env.BASE_URL}videoplayback.mp4`} type="video/mp4" />
      </video>
    </div>
  )
}

function WelcomePage({ onVideoReady }: { onVideoReady: () => void }) {
  const [titleVisible, setTitleVisible] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    const t0 = setTimeout(() => setTitleVisible(true), 300)

    const lineTimers = LOADING_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(prev => [...prev, i]), 5000 + i * 2200)
    )

    // "Ready for it?" is the last line. It appears at 5000 + 2*2200 = 9400ms.
    // 3 seconds after that → 12400ms
    const lastLineDelay = 5000 + (LOADING_LINES.length - 1) * 2200
    const videoTimer = setTimeout(onVideoReady, lastLineDelay + 3000)

    return () => {
      clearTimeout(t0)
      lineTimers.forEach(clearTimeout)
      clearTimeout(videoTimer)
    }
  }, [onVideoReady])

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    }}>
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

      <div style={{
        marginTop: '72px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        minHeight: `${LOADING_LINES.length * 44}px`,
      }}>
        {LOADING_LINES.map((line, i) => (
          <p key={i} style={{
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
          }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [scene, setScene] = useState<Scene>('landing')
  const [landingFading, setLandingFading] = useState(false)
  const [tunnelActive, setTunnelActive] = useState(false)
  const [blackOverlay, setBlackOverlay] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const [videoVisible, setVideoVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleActivate = () => {
    const video = videoRef.current

    if (video) {
      video.removeAttribute('muted')
      video.defaultMuted = false
      video.muted = false
      video.volume = 1

      void video.play()
    }

    // 1. Landing content fades out
    setLandingFading(true)

    // 2. Tunnel transition starts (fog fill + rings)
    setTimeout(() => setTunnelActive(true), 200)

    // 3. Black curtain closes over the tunnel
    setTimeout(() => setBlackOverlay(1), 1900)

    // 4. Switch scene while fully black
    setTimeout(() => {
      setScene('welcome')
      setTunnelActive(false)
      setShowWelcome(true)
    }, 2500)

    // 5. Black fades out revealing welcome
    setTimeout(() => setBlackOverlay(0), 2600)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#030305',
    }}>
      <FogBackground />
      <TunnelTransition active={tunnelActive} />

      {/* Black curtain */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        opacity: blackOverlay,
        transition: blackOverlay === 1 ? 'opacity 0.7s ease' : 'opacity 1.0s ease',
        pointerEvents: blackOverlay > 0.5 ? 'all' : 'none',
        zIndex: 40,
      }} />

      {scene === 'landing' && <LandingPage onActivate={handleActivate} fading={landingFading} />}
      {scene === 'welcome' && showWelcome && <WelcomePage onVideoReady={() => setVideoVisible(true)} />}
      <VideoScreen visible={videoVisible} videoRef={videoRef} />
    </div>
  )
}
