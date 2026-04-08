export function createMoveCommand(session, direction) {
  return {
    type: 'MOVE',
    direction,
    playerName: session.playerName,
    role: session.role,
    characterId: session.characterId,
    roomCode: session.roomCode,
    timestamp: Date.now(),
  }
}

export function createActionCommand(session) {
  return {
    type: 'ACTION',
    playerName: session.playerName,
    role: session.role,
    characterId: session.characterId,
    roomCode: session.roomCode,
    timestamp: Date.now(),
  }
}

export function createEndTurnCommand(session) {
  return {
    type: 'END_TURN',
    playerName: session.playerName,
    role: session.role,
    characterId: session.characterId,
    roomCode: session.roomCode,
    timestamp: Date.now(),
  }
}