import mongoose from 'mongoose'

const { Schema, model } = mongoose

const positionSchema = new Schema({
  x: Number,
  y: Number,
  z: Number,
})

const rotationSchema = new Schema({
  x: Number,
  y: Number,
  z: Number,
})

const scaleSchema = new Schema({
  x: Number,
  y: Number,
  z: Number,
})

const modelSchema = new Schema({
  id: String,
  position: positionSchema,
  name: String,
  rotation: rotationSchema,
  scale: scaleSchema,
})

// SCHEMA
const userSchema = new Schema({
  address: String,
  models: [modelSchema],
})

export default model('User', userSchema)
