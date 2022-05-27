import { Room, Client } from 'colyseus'
import {
  Player,
  PlayerState,
  Position,
  IPosition,
  IData,
  IRotation,
  Rotation,
  Anim,
  Animation,
  IAnimation,
} from './PlayerState'

export class MyRoom extends Room {
  onCreate(options: any) {
    this.setState(new PlayerState())

    this.onMessage('move', (client: Client, data: IData) => {
      const player = this.state.players.get(client.sessionId)
      const { position, rotation } = data

      if (position) {
        player.position.x = position.x
        player.position.y = position.y
        player.position.z = position.z
      }

      if (rotation) {
        player.rotation.x = rotation.x
        player.rotation.y = rotation.y
        player.rotation.z = rotation.z
      }
    })

    this.onMessage('anim', (client: Client, data: IData) => {
      const player = this.state.players.get(client.sessionId)
      const { animation } = data

      if (animation) {
        player.animation.animation = animation
      }
      // console.log(player.animation.animation)
    })
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  onJoin(client: Client, options: any) {
    console.log(`${client.sessionId} joined`)

    const initPlayerPosition: IPosition = {
      x: this.getRandomInt(-5, 5),
      y: 0.5,
      z: this.getRandomInt(-5, 5),
    }

    const initPlayerRotation: IRotation = {
      x: 0,
      y: 0,
      z: 0,
    }

    const initPlayerAnim: IAnimation = {
      animation: 'Idle',
    }

    const playerName = `${options.name}` || 'Anonymous'
    const newPlayer = new Player(
      client.id,
      playerName,
      new Position(initPlayerPosition),
      new Rotation(initPlayerRotation),
      new Animation(initPlayerAnim)
    )

    this.state.players.set(client.sessionId, newPlayer)
    // console.log(this.state.players.size)
  }

  onLeave(client: Client) {
    const player = this.state.players.get(client.sessionId)
    console.log(`${player.name} - ${client.sessionId} leaved`)
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log('Disposing room...')
  }
}
