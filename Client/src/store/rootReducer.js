import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import playerReducer from './slices/playerSlice'
import playlistReducer from './slices/playlistSlice'
import { nearbyListenersReducer } from '../features/nearby-listeners/model/slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  playlists: playlistReducer,
  nearbyListeners: nearbyListenersReducer,
})