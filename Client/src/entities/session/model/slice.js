import { createSlice } from '@reduxjs/toolkit'
import { tokenService } from '@/shared/lib/storage'

const initialState = {
  user: null,
  token: tokenService.getAccessToken(),
  isAuthenticated: !!tokenService.getAccessToken(),
  loading: false,
  error: null,
}

export const sessionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      tokenService.setTokens({
        access: action.payload.token,
        refresh: action.payload.refreshToken
      })
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      tokenService.removeTokens()
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = sessionSlice.actions
export const authReducer = sessionSlice.reducer