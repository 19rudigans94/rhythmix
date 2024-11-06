import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  volume: 1,
  likedTracks: [],
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload
      state.isPlaying = true
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
    },
    setQueue: (state, action) => {
      state.queue = action.payload
    },
    setVolume: (state, action) => {
      state.volume = action.payload
    },
    nextTrack: (state) => {
      const currentIndex = state.queue.findIndex(
        track => track.id === state.currentTrack.id
      )
      if (currentIndex < state.queue.length - 1) {
        state.currentTrack = state.queue[currentIndex + 1]
      }
    },
    previousTrack: (state) => {
      const currentIndex = state.queue.findIndex(
        track => track.id === state.currentTrack.id
      )
      if (currentIndex > 0) {
        state.currentTrack = state.queue[currentIndex - 1]
      }
    },
    toggleLike: (state, action) => {
      const trackId = action.payload.id
      const index = state.likedTracks.findIndex(track => track.id === trackId)
      if (index === -1) {
        state.likedTracks.push(action.payload)
      } else {
        state.likedTracks.splice(index, 1)
      }
    },
  },
})

export const {
  setCurrentTrack,
  togglePlay,
  setQueue,
  setVolume,
  nextTrack,
  previousTrack,
  toggleLike,
} = playerSlice.actions

export default playerSlice.reducer