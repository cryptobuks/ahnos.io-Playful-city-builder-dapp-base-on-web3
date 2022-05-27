import { createSlice } from '@reduxjs/toolkit'

export type Toolbar = {
  currentTool: 'MOVE' | 'SCALE' | 'ROTATE'
}

export type ToolbarState = {
  currentTool: 'translate' | 'scale' | 'rotate'
}

const initialState: ToolbarState = {
  currentTool: 'translate',
}

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    changeTool: (state: ToolbarState, action) => {
      // const { tool } = action.payload
      state.currentTool = action.payload
    },
  },
})

export const { changeTool } = toolbarSlice.actions

export default toolbarSlice.reducer
