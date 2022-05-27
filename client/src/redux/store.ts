import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import modelReducer from './model.slice'
import toolbarReducer from './toolbar.slice'
import mintReducer from './mint.slice'
import localforage from 'localforage'

const persistConfig = {
  key: 'root',
  storage: localforage,
}

const reducers = combineReducers({
  model: modelReducer,
  toolbar: toolbarReducer,
  mint: mintReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>

export default store
