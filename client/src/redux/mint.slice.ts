import { createSlice } from '@reduxjs/toolkit'

export type Mint = {
  imageUrl: string
  fileUrl: string
  metadataUrl: string
}

export type MintState = {
  imageUrl: string
  fileUrl: string
  metadataUrl: string
}

const initialState: MintState = {
  imageUrl: '',
  fileUrl: '',
  metadataUrl: '',
}

export const mintSlice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    updateImageUrl: (state: MintState, action) => {
      state.imageUrl = action.payload
    },
    updateFileUrl: (state: MintState, action) => {
      state.fileUrl = action.payload
    },
    updateMetadataUrl: (state: MintState, action) => {
      state.metadataUrl = action.payload
    },
  },
})

export const { updateImageUrl, updateFileUrl, updateMetadataUrl } =
  mintSlice.actions

export default mintSlice.reducer
