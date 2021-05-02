export interface Identity {
  name: string
}

export interface Game {
  name: string
  players: Player[]
  state: GameState
  gameType: GameType
  creator: string
}

export enum GameType {
  LEITERLI = "LEITERLI",
  WERWOERTER = "WERWOERTER",
  SECRET = "SECRET",
  WERWOELFLE = "WERWOELFLE",
  TEMPEL = "TEMPEL"
}

export enum GameState {
  RUNNING = "RUNNING",
  FINISHED = "FINISHED",
  CREATED = "CREATED",
  DELETED = "DELETED"
}

export interface Player {
  name: string
  state: PlayerState
}

export enum PlayerState {
  JOINED, PLAYING, FINISHED
}

