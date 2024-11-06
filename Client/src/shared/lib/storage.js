export const TOKEN_KEY = 'rhythmix_token'
export const REFRESH_TOKEN_KEY = 'rhythmix_refresh_token'

export const tokenService = {
  setTokens(tokens) {
    localStorage.setItem(TOKEN_KEY, tokens.access)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh)
  },

  getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  removeTokens() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}