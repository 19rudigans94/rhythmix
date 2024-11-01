import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['player/setCurrentTrack'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['player.currentTrack'],
      },
    }),
})