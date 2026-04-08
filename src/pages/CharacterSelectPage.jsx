import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const characters = [
  {
    id: 'survivor-blue',
    role: 'survivor',
    name: 'LINTER',
    story: 'Explorador silencioso que se orienta rápido en la oscuridad.',
    skill: 'Puede detectar rutas seguras con mayor facilidad.',
    accent: '#2f86ff',
  },
  {
    id: 'survivor-yellow',
    role: 'survivor',
    name: 'HUNTER',
    story: 'Sobrevive bajo presión y reacciona rápido ante el peligro.',
    skill: 'Se adapta bien a espacios cerrados y pasillos estrechos.',
    accent: '#d7a61a',
  },
  {
    id: 'survivor-green',
    role: 'survivor',
    name: 'SCOUT',
    story: 'Ligero, atento y con gran capacidad para explorar.',
    skill: 'Ubica objetivos importantes con más rapidez.',
    accent: '#63c74d',
  },
  {
    id: 'killer-red',
    role: 'killer',
    name: 'BUTCHER',
    story: 'Acecha desde las sombras y controla el ritmo de la partida.',
    skill: 'Elimina al grupo con solo alcanzar a un superviviente.',
    accent: '#d63b3b',
  },
]

export default function CharacterSelectPage() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  const selectedCharacter = useMemo(() => characters[index], [index])

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1))
  }

  const goNext = () => {
    setIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1))
  }

  const handleConfirm = () => {
    const raw = localStorage.getItem('bm_session')
    const session = raw ? JSON.parse(raw) : {}

    localStorage.setItem(
      'bm_session',
      JSON.stringify({
        ...session,
        characterId: selectedCharacter.id,
        role: selectedCharacter.role,
      }),
    )

    navigate('/controller')
  }

  return (
    <main className="min-h-screen bg-[#120404] text-[#f5e6d3]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-6">
        <section className="rounded-2xl border border-[#a34b3b] bg-[#240707] p-4 shadow-2xl shadow-black/40">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg border border-[#b96a57] px-3 py-2 text-lg"
            >
              ←
            </button>

            <h1 className="text-lg font-bold tracking-wide">
              Selección de Personaje
            </h1>

            <div className="w-10" />
          </div>

          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <button
              onClick={goPrev}
              className="rounded-lg border border-[#b96a57] px-3 py-8 text-2xl"
            >
              ‹
            </button>

            <div className="flex flex-col items-center gap-3">
              <div
                className="flex h-36 w-36 items-center justify-center rounded-full border-4 bg-[#4b0d0d] text-center text-sm font-bold uppercase"
                style={{ borderColor: selectedCharacter.accent }}
              >
                <div className="px-4">
                  <div className="text-xs opacity-70">{selectedCharacter.role}</div>
                  <div className="mt-1 text-lg">{selectedCharacter.name}</div>
                </div>
              </div>

              <div className="w-full rounded-xl border border-[#b96a57] bg-[#3a0c0c] p-3">
                <h2 className="mb-1 text-sm font-bold uppercase">Historia</h2>
                <p className="text-sm text-[#f3dcca]">
                  {selectedCharacter.story}
                </p>
              </div>

              <div className="w-full rounded-xl border border-[#b96a57] bg-[#3a0c0c] p-3">
                <h2 className="mb-1 text-sm font-bold uppercase">Habilidad</h2>
                <p className="text-sm text-[#f3dcca]">
                  {selectedCharacter.skill}
                </p>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full rounded-lg border border-[#d08c73] bg-[#6a1515] px-4 py-3 text-lg font-bold tracking-wide"
              >
                Confirmar
              </button>
            </div>

            <button
              onClick={goNext}
              className="rounded-lg border border-[#b96a57] px-3 py-8 text-2xl"
            >
              ›
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}