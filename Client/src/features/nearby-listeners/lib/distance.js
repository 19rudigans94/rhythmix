const EARTH_RADIUS = 6371 // kilometers

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180

  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = EARTH_RADIUS * c

  return distance
}

export function formatDistance(kilometers) {
  if (kilometers < 1) {
    return `${Math.round(kilometers * 1000)}m away`
  }
  return `${kilometers.toFixed(1)}km away`
}