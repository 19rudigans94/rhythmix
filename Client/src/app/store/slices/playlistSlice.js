import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playlists: [],
  currentPlaylist: null,
  loading: false,
  error: null,
}

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    fetchPlaylistsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchPlaylistsSuccess: (state, action) => {
      state.loading = false
      state.playlists = Array.isArray(action.payload) ? action.payload : []
    },
    fetchPlaylistsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.playlists = []
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload
    },
    addPlaylist: (state, action) => {
      state.playlists.push(action.payload)
    },
    removePlaylist: (state, action) => {
      state.playlists = state.playlists.filter(
        playlist => playlist.id !== action.payload
      )
    },
    updatePlaylist: (state, action) => {
      const index = state.playlists.findIndex(
        playlist => playlist.id === action.payload.id
      )
      if (index !== -1) {
        state.playlists[index] = action.payload
      }
    },
  },
})

export const {
  fetchPlaylistsStart,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  setCurrentPlaylist,
  addPlaylist,
  removePlaylist,
  updatePlaylist,
} = playlistSlice.actions

export default playlistSlice.reducer