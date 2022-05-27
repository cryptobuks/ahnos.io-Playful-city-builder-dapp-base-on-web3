import { Schema, MapSchema, type } from '@colyseus/schema'

export interface IPosition {
  x: number
  y: number
  z: number
}

export interface IRotation {
  x: number
  y: number
  z: number
}

export type Anim = 'Idle' | 'Run'

export interface IAnimation {
  animation: 'Idle' | 'Run'
}

export interface IData {
  position: IPosition
  rotation: IRotation
  animation: IAnimation
}

export class Position extends Schema {
  @type('number') x: number
  @type('number') y: number
  @type('number') z: number
}

export class Rotation extends Schema {
  @type('number') x: number
  @type('number') y: number
  @type('number') z: number
}

export class Animation extends Schema {
  @type('string') animation: 'Idle' | 'Run'
}

export class Player extends Schema {
  @type('string') id: string
  @type('string') name: string
  @type(Position) position: IPosition
  @type(Rotation) rotation: IRotation
  @type(Animation) animation: IAnimation

  constructor(
    id: string,
    name: string,
    position: Position,
    rotation: Rotation,
    animation: Animation
  ) {
    super()
    this.id = id
    this.name = name
    this.position = position
    this.rotation = rotation
    this.animation = animation
  }
}

export class PlayerState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>()

  constructor() {
    super()
  }
}
