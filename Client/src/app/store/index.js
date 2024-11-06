import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['player/setCurrentTrack'],
        ignoredActionPaths: ['payload.timestamp'],
        ignoredPaths: ['player.currentTrack'],
      },
    }),
})