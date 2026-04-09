import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const particles = [
  { size: 6, left: '8%', top: '18%', delay: '0s', duration: '7s' },
  { size: 4, left: '18%', top: '32%', delay: '1s', duration: '9s' },
  { size: 5, left: '28%', top: '15%', delay: '2s', duration: '8s' },
  { size: 3, left: '40%', top: '28%', delay: '0.5s', duration: '10s' },
  { size: 6, left: '55%', top: '20%', delay: '1.5s', duration: '7.5s' },
  { size: 4, left: '68%', top: '35%', delay: '2.5s', duration: '9.5s' },
  { size: 5, left: '78%', top: '16%', delay: '0.8s', duration: '8.5s' },
  { size: 3, left: '88%', top: '26%', delay: '1.8s', duration: '11s' },
  { size: 4, left: '14%', top: '55%', delay: '2.2s', duration: '10s' },
  { size: 5, left: '82%', top: '58%', delay: '1.2s', duration: '8s' },
]

export default function WelcomePage() {
  const navigate = useNavigate()
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const handleStart = () => {
    setIsLeaving(true)

    setTimeout(() => {
      navigate('/intro')
    }, 700)
  }

  return (
    <>
      <style>{`
        @keyframes fadeInPage {
          from {
            opacity: 0;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOutPage {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.98);
          }
        }

        @keyframes floatSlow {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(6px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        @keyframes pulseGlow {
          0% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
          100% { opacity: 0.35; transform: scale(1); }
        }

        @keyframes flickerTitle {
          0%, 100% { opacity: 1; }
          10% { opacity: 0.92; }
          20% { opacity: 1; }
          30% { opacity: 0.96; }
          40% { opacity: 1; }
          70% { opacity: 0.98; }
        }

        @keyframes blinkHint {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.9; }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.15;
          }
          25% {
            transform: translateY(-8px) translateX(5px);
            opacity: 0.45;
          }
          50% {
            transform: translateY(-16px) translateX(-4px);
            opacity: 0.25;
          }
          75% {
            transform: translateY(-9px) translateX(6px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.15;
          }
        }
          
        .welcome-enter {
          animation: fadeInPage 1s ease-out forwards;
        }

        .welcome-exit {
          animation: fadeOutPage 0.7s ease-in forwards;
        }

        .fog-one {
          animation: floatSlow 7s ease-in-out infinite;
        }

        .fog-two {
          animation: floatSlow 10s ease-in-out infinite;
        }

        .glow-pulse {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .title-flicker {
          animation: flickerTitle 3.5s infinite;
        }

        .hint-blink {
          animation: blinkHint 1.8s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          border-radius: 9999px;
          background: rgba(255, 230, 210, 0.35);
          box-shadow: 0 0 12px rgba(255, 220, 200, 0.2);
          animation-name: particleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes riseFade {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reveal-1 { animation: riseFade 0.8s ease-out 0.10s both; }
        .reveal-2 { animation: riseFade 0.8s ease-out 0.22s both; }
        .reveal-3 { animation: riseFade 0.8s ease-out 0.34s both; }
        .reveal-4 { animation: riseFade 0.8s ease-out 0.46s both; }
        .reveal-5 { animation: riseFade 0.8s ease-out 0.58s both; }
        .reveal-6 { animation: riseFade 0.8s ease-out 0.72s both; }

        
      `}</style>

      <div
        className={`relative h-screen w-screen overflow-hidden bg-[#120404] text-[#f5e6d3] ${isLeaving ? 'welcome-exit' : 'welcome-enter'
          }`}
      >
        {/* Fondo oscuro con degradado */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(106,21,21,0.35),_transparent_45%),linear-gradient(to_bottom,_#1b0606,_#120404,_#090202)]" />

        {/* Niebla / manchas de ambiente */}
        <div className="fog-one glow-pulse absolute left-[-80px] top-20 h-72 w-72 rounded-full bg-[#7a1d1d]/20 blur-3xl" />
        <div className="fog-two absolute bottom-10 right-[-60px] h-80 w-80 rounded-full bg-[#d08c73]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3d0b0b]/25 blur-3xl" />

        {/* Partículas */}
        {particles.map((particle, index) => (
          <span
            key={index}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}


        {/* Viñeta */}
        <div className="absolute inset-x-0 bottom-[-8%] h-40 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.25)_45%,_transparent_75%)] blur-2xl" />
        {/* <div className="absolute inset-0 bg-black/25 shadow-[inset_0_0_180px_rgba(0,0,0,0.9)]" /> */}

        {/* Contenido */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">

          <div className="reveal-1 mx-auto mb-4 h-[1px] w-50 bg-gradient-to-r from-transparent via-[#d08c73] to-transparent" />

          <p className="reveal-2 mb-3 text-xs uppercase tracking-[0.5em] text-[#c89d8c]/80">
            Blackwood Maze
          </p>

          <h1 className="reveal-3 title-flicker text-5xl font-extrabold uppercase tracking-[0.2em] text-[#f8e9da] drop-shadow-[0_0_14px_rgba(208,140,115,0.18)] sm:text-6xl">
            Blackwood
          </h1>

          <p className="reveal-4 font-marcellus mt-5 max-w-xs text-base leading-relaxed text-[#e7cdbd]/85 sm:text-lg">
            Adéntrate en la mansión. Coopera, sospecha y sobrevive.
          </p>

          <button
            onClick={handleStart}
             className="reveal-5 font-cinzel mt-8 rounded-2xl border border-[#d08c73] bg-[#6a1515]/90 px-8 py-3 text-[0.95rem] font-normal uppercase tracking-[0.26em] text-[#fff1e6] shadow-[0_0_30px_rgba(106,21,21,0.45)] transition duration-300 hover:scale-[1.03] hover:bg-[#7c1a1a] active:scale-[0.98]"
          >
            Comenzar
          </button>

          <p className="reveal-6 hint-blink mt-6 text-xs uppercase tracking-[0.35em] text-[#c89d8c]/60">
            Toca para entrar
          </p>

           {/* <div className="mx-auto mb-4 h-[1px] w-20 bg-gradient-to-r from-transparent via-[#d08c73] to-transparent" /> */}
        </div>
      </div>
    </>
  )
}