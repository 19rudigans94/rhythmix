export const API_URL = 'http://127.0.0.1:8000/api/v1'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  PLAYLISTS: {
    BASE: '/playlists',
    BY_ID: (id) => `/playlists/${id}`,
    TRACKS: (id) => `/playlists/${id}/tracks`,
  },
  TRACKS: {
    BASE: '/tracks',
    SEARCH: '/tracks/search',
    BY_ID: (id) => `/tracks/${id}`,
    LIKE: (id) => `/tracks/${id}/like`,
    LIKED: '/tracks/liked',
    RECOMMENDED: '/tracks/recommended',
  },
}