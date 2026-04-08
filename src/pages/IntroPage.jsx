import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function IntroPage() {
  const navigate = useNavigate()

  const [roomCode, setRoomCode] = useState('')
  const [playerName, setPlayerName] = useState('')

  const handlePlay = () => {
    const cleanRoomCode = roomCode.trim().toUpperCase()
    const cleanPlayerName = playerName.trim().slice(0, 6)

    if (!cleanRoomCode || !cleanPlayerName) return

    localStorage.setItem(
      'bm_session',
      JSON.stringify({
        roomCode: cleanRoomCode,
        playerName: cleanPlayerName,
      }),
    )

    navigate('/select')
  }

  return (
    <main className="min-h-screen bg-[#120404] text-[#f5e6d3]">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col items-center justify-center px-6 py-8">
        <section className="w-full rounded-2xl border border-[#a34b3b] bg-[#240707] p-5 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <button className="rounded-md border border-[#b96a57] px-3 py-2 text-lg">
              ☰
            </button>

            <div className="rounded-md border border-[#b96a57] px-4 py-2 text-sm font-semibold tracking-wide">
              BLACKWOOD MAZE
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold tracking-wide text-[#f2d5bf]">
                Código Sala
              </label>
              <input
                type="text"
                maxLength={6}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                className="w-full rounded-lg border border-[#b96a57] bg-[#3a0c0c] px-4 py-3 text-center text-lg uppercase outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold tracking-wide text-[#f2d5bf]">
                Nombre Usuario
              </label>
              <input
                type="text"
                maxLength={6}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="USUARIO"
                className="w-full rounded-lg border border-[#b96a57] bg-[#3a0c0c] px-4 py-3 text-center text-lg uppercase outline-none"
              />
            </div>

            <button
              onClick={handlePlay}
              className="w-full rounded-lg border border-[#d08c73] bg-[#6a1515] px-4 py-3 text-lg font-bold tracking-wide"
            >
              JUGAR
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}