export type JokeMode = 'jp-kr' | 'western'

export type Atmosphere = 'cold' | 'medium' | 'hot'

export interface JokeRequestBody {
  mode: JokeMode
  target?: string
  age?: number
  heat?: number
  atmosphere?: Atmosphere
}
