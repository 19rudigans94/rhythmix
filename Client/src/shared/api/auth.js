import { baseAPI } from './base'

export const authAPI = {
  login: (credentials) => 
    baseAPI.post('/users/login/', credentials),
  
  register: (userData) => 
    baseAPI.post('/users/', userData),
  
  googleLogin: () => 
    baseAPI.get('/google/login/'),
  
  googleCallback: (code) => 
    baseAPI.get(`/google/callback/?code=${code}`),
  
  getProfile: () => 
    baseAPI.get('/user'),
  
  uploadAvatar: (formData) => 
    baseAPI.post('/users/upload-avatar/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}