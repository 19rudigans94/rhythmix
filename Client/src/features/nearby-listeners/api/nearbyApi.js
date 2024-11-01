import { baseAPI } from '@/shared/api/base'

export const nearbyAPI = {
  getNearbyListeners: () => 
    baseAPI.get('/nearby-listeners'),
  
  updateListeningStatus: (trackId) => 
    baseAPI.post('/nearby-listeners/status', { trackId })
}