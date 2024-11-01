import { baseAPI } from './base'

export const authAPI = {
  login: (credentials) => 
    baseAPI.post('/auth/login', credentials),
  
  register: (userData) => 
    baseAPI.post('/auth/register', userData),
  
  logout: () => 
    baseAPI.post('/auth/logout'),
  
  refreshToken: () => 
    baseAPI.post('/auth/refresh'),
  
  getProfile: () => 
    baseAPI.get('/auth/profile'),
  
  updateProfile: (data) => 
    baseAPI.put('/auth/profile', data)
}