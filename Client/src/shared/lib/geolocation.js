let cachedPosition = null
let cacheTimestamp = 0
const CACHE_DURATION = 60000 // 1 minute

export const getCurrentPosition = async () => {
  const now = Date.now()
  
  // Return cached position if it's still valid
  if (cachedPosition && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedPosition
  }

  try {
    const position = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            timestamp: new Date().toISOString()
          })
        },
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    })

    // Cache the new position
    cachedPosition = position
    cacheTimestamp = now

    return position
  } catch (error) {
    console.warn('Geolocation error:', error)
    throw error
  }
}