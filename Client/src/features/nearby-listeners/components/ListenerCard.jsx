import { memo } from 'react'
import { formatDistance } from '../lib/distance'
import { Link } from 'react-router-dom'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import { i18n } from '@/shared/lib/i18n'

const ListenerCard = memo(({ listener, userLocation }) => {
  const distance = userLocation && listener.location
    ? formatDistance(calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        listener.location.latitude,
        listener.location.longitude
      ))
    : null

  return (
    <div className="card-wasabi p-4 group">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={listener.avatar || '/default-avatar.png'}
            alt={listener.name}
            className="w-10 h-10 rounded-full ring-2 ring-wasabi-500/30 
                     group-hover:ring-wasabi-500 transition-colors"
          />
          {listener.currentTrack && (
            <div className="absolute -bottom-1 -right-1 bg-wasabi-500 rounded-full 
                          p-1 animate-pulse">
              <MusicalNoteIcon className="h-3 w-3 text-black" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <Link 
            to={`/profile/${listener.id}`}
            className="font-medium hover:text-wasabi-500 transition-colors 
                     truncate block"
          >
            {listener.name}
          </Link>
          {distance && (
            <p className="text-xs text-gray-400">
              {distance}
            </p>
          )}
        </div>
      </div>

      {listener.currentTrack && (
        <div className="mt-3 pl-13 bg-white/5 p-3 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">
            {i18n.t('nearby.listening')}:
          </p>
          <Link 
            to={`/track/${listener.currentTrack.id}`}
            className="text-sm hover:text-wasabi-500 transition-colors 
                     truncate block"
          >
            {listener.currentTrack.title} - {listener.currentTrack.artist}
          </Link>
        </div>
      )}
    </div>
  )
})

ListenerCard.displayName = 'ListenerCard'
export default ListenerCard