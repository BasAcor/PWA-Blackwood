const COMMAND_QUEUE_KEY = 'bm_command_queue'
const TRANSPORT_STATUS_KEY = 'bm_transport_status'

export function getCommandQueue() {
  const raw = localStorage.getItem(COMMAND_QUEUE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function clearCommandQueue() {
  localStorage.removeItem(COMMAND_QUEUE_KEY)
}

export function getTransportStatus() {
  const raw = localStorage.getItem(TRANSPORT_STATUS_KEY)

  if (raw) {
    return JSON.parse(raw)
  }

  return {
    connected: true,
    mode: 'mock-local',
    lastSentAt: null,
    pendingCount: 0,
  }
}

export function sendCommand(command) {
  const queue = getCommandQueue()
  const updatedQueue = [command, ...queue].slice(0, 20)

  localStorage.setItem(COMMAND_QUEUE_KEY, JSON.stringify(updatedQueue))

  const status = {
    connected: true,
    mode: 'mock-local',
    lastSentAt: Date.now(),
    pendingCount: updatedQueue.length,
  }

  localStorage.setItem(TRANSPORT_STATUS_KEY, JSON.stringify(status))

  console.log('Mock transport -> comando enviado:', command)

  return {
    queue: updatedQueue,
    status,
  }
}