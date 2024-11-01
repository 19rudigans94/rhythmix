import { createSlice } from '@reduxjs/toolkit'
import { tokenService } from '@/shared/lib/cookies'

const initialState = {
  user: null,
  isAuthenticated: !!tokenService.getAccessToken(),
  loading: false,
  error: null,
}

const authSlice = createSlice({
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
      tokenService.setTokens({
        access: action.payload.accessToken,
        refresh: action.payload.refreshToken
      })
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      tokenService.removeTokens()
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions
export default authSlice.reducer