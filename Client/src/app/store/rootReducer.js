import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import playerReducer from './slices/playerSlice'
import playlistReducer from './slices/playlistSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  playlists: playlistReducer,
})