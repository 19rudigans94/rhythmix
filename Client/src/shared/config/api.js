export const API_URL = '/api/v1'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login/',
    REGISTER: '/users/',
    GOOGLE_LOGIN: '/google/login/',
    GOOGLE_CALLBACK: '/google/callback/',
    PROFILE: '/user',
    UPLOAD_AVATAR: '/users/upload-avatar/'
  },
  ALBUMS: {
    BASE: '/albums-create/',
    BY_ID: (id) => `/albums/${id}/`,
    IMPORT: '/import-album-spotify/'
  },
  ARTISTS: {
    BASE: '/artists/',
    BY_ID: (id) => `/artists/${id}/`,
    IMPORT: '/import-artist-spotify/'
  },
  PLAYLISTS: {
    BASE: '/playlists/',
    CREATE: '/create-user-playlists/',
    DETAILS: '/detail-playlists/',
    BY_ID: (id) => `/playlists/${id}/`,
    ADD_TRACK: (id) => `/playlists/${id}/add-track/`,
    REMOVE_TRACK: (id) => `/playlists/${id}/remove-track/`,
    IMPORT: '/import-playlist-spotify/'
  },
  TRACKS: {
    BASE: '/tracks/',
    IMPORT: '/import-track-spotify/'
  }
}