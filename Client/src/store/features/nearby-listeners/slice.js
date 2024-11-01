import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listeners: [],
  loading: false,
  error: null,
  lastUpdate: null,
}

const nearbyListenersSlice = createSlice({
  name: 'nearbyListeners',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.listeners = action.payload
      state.lastUpdate = new Date().toISOString()
    },
    fetchError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateListenerStatus: (state, action) => {
      const { userId, status } = action.payload
      const listener = state.listeners.find(l => l.id === userId)
      if (listener) {
        listener.currentTrack = status.currentTrack
        listener.lastUpdate = status.timestamp
      }
    },
  },
})

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  updateListenerStatus,
} = nearbyListenersSlice.actions

export default nearbyListenersSlice.reducer