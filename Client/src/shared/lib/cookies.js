import Cookies from 'js-cookie'

const TOKEN_KEY = 'rhythmix_token'
const REFRESH_TOKEN_KEY = 'rhythmix_refresh_token'

export const cookieOptions = {
  secure: true,
  sameSite: 'strict',
  expires: 7 // 7 days
}

export const tokenService = {
  setTokens(tokens) {
    Cookies.set(TOKEN_KEY, tokens.access, cookieOptions)
    Cookies.set(REFRESH_TOKEN_KEY, tokens.refresh, cookieOptions)
  },

  getAccessToken() {
    return Cookies.get(TOKEN_KEY)
  },

  getRefreshToken() {
    return Cookies.get(REFRESH_TOKEN_KEY)
  },

  removeTokens() {
    Cookies.remove(TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
  }
}