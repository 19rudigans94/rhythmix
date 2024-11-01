import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/entities/session'
import { playerReducer } from '@/entities/player'
import { playlistReducer } from '@/entities/playlist'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    playlists: playlistReducer,
  },
})