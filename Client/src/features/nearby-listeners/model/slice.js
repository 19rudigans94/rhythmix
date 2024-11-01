import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listeners: [],
  loading: false,
  error: null,
  lastUpdate: null,
}

export const nearbyListenersSlice = createSlice({
  name: 'nearbyListeners',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.listeners = Array.isArray(action.payload) ? action.payload : []
      state.lastUpdate = new Date().toISOString()
      state.error = null
    },
    fetchError: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.listeners = []
    },
    updateListenerStatus: (state, action) => {
      const { userId, status } = action.payload
      const listener = state.listeners.find(l => l.id === userId)
      if (listener) {
        listener.currentTrack = status.currentTrack
        listener.lastUpdate = status.timestamp
      }
    },
    clearListeners: (state) => {
      state.listeners = []
      state.lastUpdate = null
    },
  },
})

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  updateListenerStatus,
  clearListeners,
} = nearbyListenersSlice.actions

export const nearbyListenersReducer = nearbyListenersSlice.reducer