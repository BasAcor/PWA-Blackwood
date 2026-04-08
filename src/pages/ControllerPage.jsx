import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createActionCommand,
  createEndTurnCommand,
  createMoveCommand,
} from '../utils/commandFactory'
import { getCommandQueue, getTransportStatus, sendCommand } from '../services/mockTransport'

const initialGameState = {
  currentRoom: 'Galería',
  isAlive: true,
  isMyTurn: true,
  lastAction: 'Esperando acción...',
}

export default function ControllerPage() {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [gameState, setGameState] = useState(initialGameState)
  const [lastCommand, setLastCommand] = useState(null)
  const [commandHistory, setCommandHistory] = useState([])
  const [transportStatus, setTransportStatus] = useState(getTransportStatus())

  useEffect(() => {
    const raw = localStorage.getItem('bm_session')

    if (!raw) {
      navigate('/')
      return
    }

    setSession(JSON.parse(raw))
    setCommandHistory(getCommandQueue())
    setTransportStatus(getTransportStatus())
  }, [navigate])

  const statusText = useMemo(() => {
    if (!gameState.isAlive) return 'Muerto'
    if (gameState.isMyTurn) return 'Es tu turno'
    return 'Esperando turno'
  }, [gameState])

  const registerCommand = (command, actionLabel) => {
    const result = sendCommand(command)

    setLastCommand(command)
    setCommandHistory(result.queue)
    setTransportStatus(result.status)
    setGameState((prev) => ({
      ...prev,
      lastAction: actionLabel,
    }))

    console.log('Comando generado:', command)
  }

  const handleMove = (direction, label) => {
    if (!session || !gameState.isMyTurn || !gameState.isAlive) return

    const command = createMoveCommand(session, direction)
    registerCommand(command, `Movimiento: ${label}`)
  }

  const handleAction = () => {
    if (!session || !gameState.isMyTurn || !gameState.isAlive) return

    const command = createActionCommand(session)
    registerCommand(command, 'Acción ejecutada')
  }

  const handleEndTurn = () => {
    if (!session || !gameState.isMyTurn || !gameState.isAlive) return

    const command = createEndTurnCommand(session)
    registerCommand(command, 'Turno finalizado')

    setGameState((prev) => ({
      ...prev,
      isMyTurn: false,
    }))
  }

  if (!session) return null

  return (
    <main className="min-h-screen bg-[#120404] text-[#f5e6d3]">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col px-4 py-5">
        <div className="mb-4 rounded-2xl border border-[#a34b3b] bg-[#240707]/95 p-4 shadow-2xl shadow-black/40">
          <h1 className="text-2xl font-bold uppercase">{session.playerName}</h1>
          <p className="mt-1 text-sm text-[#e7c7b0]">Sala: {session.roomCode}</p>
          <p className="text-sm text-[#e7c7b0]">Rol: {session.role}</p>
          <p className="text-sm text-[#e7c7b0]">Personaje: {session.characterId}</p>
        </div>

        <div className="mb-4 rounded-2xl border border-[#a34b3b] bg-[#240707]/95 p-4">
          <p className="text-sm uppercase text-[#dcbca8]">Habitación actual</p>
          <p className="text-lg font-bold">{gameState.currentRoom}</p>
        </div>

        <div className="mb-4 rounded-2xl border border-[#a34b3b] bg-[#240707]/95 p-4">
          <p className="text-sm uppercase text-[#dcbca8]">Estado</p>
          <p className="text-lg font-bold">{statusText}</p>
          <p className="mt-2 text-sm text-[#dcbca8]">{gameState.lastAction}</p>
        </div>

        <div className="mb-4 rounded-2xl border border-[#a34b3b] bg-[#240707]/95 p-4">
          <p className="text-sm uppercase text-[#dcbca8]">Sincronización</p>
          <p className="text-lg font-bold">
            {transportStatus.connected ? 'Conectado' : 'Desconectado'}
          </p>
          <p className="mt-1 text-sm text-[#dcbca8]">Modo: {transportStatus.mode}</p>
          <p className="text-sm text-[#dcbca8]">
            Pendientes: {transportStatus.pendingCount}
          </p>
          <p className="text-sm text-[#dcbca8]">
            Último envío:{' '}
            {transportStatus.lastSentAt
              ? new Date(transportStatus.lastSentAt).toLocaleTimeString()
              : 'Sin envíos'}
          </p>
        </div>

        <div className="mb-4 rounded-2xl border border-[#a34b3b] bg-[#240707]/95 p-4">
          <p className="mb-2 text-sm uppercase text-[#dcbca8]">Último comando</p>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs text-[#f3dcca]">
            {lastCommand ? JSON.stringify(lastCommand, null, 2) : 'Sin comandos aún'}
          </pre>
        </div>

        <div className="mb-4 rounded-2xl border border-[#a34b3b] bg-[#240707]/95 p-4">
          <p className="mb-2 text-sm uppercase text-[#dcbca8]">Historial</p>
          <div className="space-y-2">
            {commandHistory.length === 0 ? (
              <p className="text-sm text-[#dcbca8]">Sin historial</p>
            ) : (
              commandHistory.map((cmd, index) => (
                <div
                  key={`${cmd.timestamp}-${index}`}
                  className="rounded-lg border border-[#7b3a2f] bg-[#2f0a0a] px-3 py-2 text-xs"
                >
                  <span className="font-bold">{cmd.type}</span>
                  {cmd.direction ? ` · ${cmd.direction}` : ''}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-auto rounded-2xl border border-[#a34b3b] bg-[#240707]/95 p-4">
          <div className="grid grid-cols-3 gap-3">
            <div />
            <button
              onClick={() => handleMove('UP', 'Arriba')}
              className="rounded-xl border border-[#d08c73] bg-[#6a1515] px-4 py-4 text-2xl font-bold active:scale-[0.98]"
            >
              ↑
            </button>
            <div />

            <button
              onClick={() => handleMove('LEFT', 'Izquierda')}
              className="rounded-xl border border-[#d08c73] bg-[#6a1515] px-4 py-4 text-2xl font-bold active:scale-[0.98]"
            >
              ←
            </button>
            <button
              onClick={handleAction}
              className="rounded-xl border border-[#d08c73] bg-[#7b1d1d] px-4 py-4 text-xl font-bold active:scale-[0.98]"
            >
              ⦿
            </button>
            <button
              onClick={() => handleMove('RIGHT', 'Derecha')}
              className="rounded-xl border border-[#d08c73] bg-[#6a1515] px-4 py-4 text-2xl font-bold active:scale-[0.98]"
            >
              →
            </button>

            <div />
            <button
              onClick={() => handleMove('DOWN', 'Abajo')}
              className="rounded-xl border border-[#d08c73] bg-[#6a1515] px-4 py-4 text-2xl font-bold active:scale-[0.98]"
            >
              ↓
            </button>
            <div />
          </div>

          <button
            onClick={handleEndTurn}
            className="mt-4 w-full rounded-xl border border-[#d08c73] bg-[#7b1d1d] px-4 py-4 text-lg font-bold uppercase active:scale-[0.98]"
          >
            Terminar Turno
          </button>
        </div>
      </div>
    </main>
  )
}