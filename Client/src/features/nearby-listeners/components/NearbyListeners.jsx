import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPosition } from '@/shared/lib/geolocation'
import { debounce } from '@/shared/lib/debounce'
import { nearbyAPI } from '../api/nearbyApi'
import { i18n } from '@/shared/lib/i18n'
import { 
  fetchStart,
  fetchSuccess,
  fetchError,
  updateListenerStatus 
} from '../model/slice'
import { 
  selectNearbyListeners,
  selectNearbyListenersLoading,
  selectNearbyListenersError 
} from '../model/selectors'
import ListenerCard from './ListenerCard'

export default function NearbyListeners() {
  const dispatch = useDispatch()
  const listeners = useSelector(selectNearbyListeners) || []
  const loading = useSelector(selectNearbyListenersLoading)
  const error = useSelector(selectNearbyListenersError)
  const [userLocation, setUserLocation] = useState(null)
  const currentTrack = useSelector((state) => state.player.currentTrack)

  const updateNearbyListeners = useCallback(async () => {
    try {
      dispatch(fetchStart())
      const response = await nearbyAPI.getNearbyListeners()
      dispatch(fetchSuccess(response.data || []))
    } catch (err) {
      dispatch(fetchError(err.message))
    }
  }, [dispatch])

  const debouncedUpdate = useCallback(
    debounce(updateNearbyListeners, 30000),
    [updateNearbyListeners]
  )

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const position = await getCurrentPosition()
        setUserLocation(position)
        updateNearbyListeners()
      } catch (error) {
        console.warn('Location access denied:', error)
        dispatch(fetchError(i18n.t('nearby.locationError')))
      }
    }

    initializeLocation()
    const interval = setInterval(debouncedUpdate, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [debouncedUpdate, dispatch])

  useEffect(() => {
    if (currentTrack) {
      nearbyAPI.updateListeningStatus(currentTrack.id)
        .catch(error => console.warn('Failed to update listening status:', error))
    }
  }, [currentTrack])

  if (loading) {
    return (
      <div className="card-wasabi p-4">
        <div className="loading-wasabi mx-auto"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-wasabi p-4">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button 
            onClick={updateNearbyListeners}
            className="mt-2 text-sm text-wasabi-500 hover:text-wasabi-400"
          >
            {i18n.t('common.tryAgain')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card-wasabi p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {i18n.t('nearby.title')}
        </h2>
        <span className="text-sm text-gray-400">
          {listeners.length} {i18n.t('nearby.online')}
        </span>
      </div>
      
      <div className="space-y-3">
        {listeners.length > 0 ? (
          listeners.map((listener) => (
            <ListenerCard
              key={listener.id}
              listener={listener}
              userLocation={userLocation}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">
            {i18n.t('nearby.noListeners')}
          </p>
        )}
      </div>
    </div>
  )
}