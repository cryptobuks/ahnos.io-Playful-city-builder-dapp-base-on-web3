import { Schema, model } from 'mongoose'

// TYPE
export interface IModel {
  id: string
  position: {
    x: number
    y: number
    z: number
  }
  name: string
  rotation: {
    x: number
    y: number
    z: number
  }
  scale: {
    x: number
    y: number
    z: number
  }
}

export interface IUser {
  address: string
  models: IModel[]
}

// SCHEMA
const modelSchema = new Schema<IUser>({
  address: String,
  models: [
    {
      id: String,
      position: {
        x: Number,
        y: Number,
        z: Number,
      },
      name: String,
      rotation: {
        x: Number,
        y: Number,
        z: Number,
      },
      scale: {
        x: Number,
        y: Number,
        z: Number,
      },
    },
  ],
})

export default model('Model', modelSchema)
