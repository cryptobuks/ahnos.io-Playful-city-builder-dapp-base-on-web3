import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type Model = {
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

export type ModelState = {
  models: Model[]
  selectedModel: string | null
}

const initialState: ModelState = {
  models: [],
  selectedModel: null,
}

export const modelSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    addModel: (state, action) => {
      const idModel = uuidv4()
      state.selectedModel = idModel
      const newModel = {
        id: idModel,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 0,
          y: 0,
          z: 0,
        },
        ...action.payload,
      }
      state.models.push(newModel)
    },
    deleteModel: (state) => {
      const filteredModels = state.models.filter(
        (model) => model.id !== state.selectedModel,
      )
      state.selectedModel = null
      state.models = filteredModels
    },
    selectModel: (state: ModelState, action) => {
      const idSelectedModel = action.payload
      state.selectedModel = idSelectedModel
    },
    cancelSelectedModel: (state) => {
      state.selectedModel = null
    },
    changeModel: (state: ModelState, action) => {
      const { name } = action.payload
      const foundIndexModel = state.models.findIndex(
        (model) => model.id === state.selectedModel,
      )
      state.models[foundIndexModel].name = name
    },
    updateModel: (state: ModelState, action) => {
      const { id, position, rotation, scale } = action.payload
      const foundModel = state.models.findIndex((model) => model.id === id)
      state.models[foundModel].position = position
      state.models[foundModel].rotation = rotation
      state.models[foundModel].scale = scale
    },
  },
})

export const {
  addModel,
  cancelSelectedModel,
  deleteModel,
  updateModel,
  changeModel,
  selectModel,
} = modelSlice.actions

export default modelSlice.reducer
