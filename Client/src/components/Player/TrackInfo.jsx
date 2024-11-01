import { memo } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'

const TrackInfo = memo(({ track, isLiked, onLike }) => (
  <div className="flex items-center w-1/3">
    <img
      src={track.albumCover}
      alt={track.title}
      className="h-14 w-14 rounded"
    />
    <div className="ml-4">
      <div className="text-sm text-white">{track.title}</div>
      <div className="text-xs text-rhythmix-light-gray">
        {track.artist}
      </div>
    </div>
    <button
      onClick={onLike}
      className={`ml-4 p-2 rounded-full hover:bg-rhythmix-black transition-colors ${
        isLiked ? 'text-rhythmix-green' : 'text-rhythmix-light-gray'
      }`}
    >
      <HeartIcon className="h-5 w-5" />
    </button>
  </div>
))

TrackInfo.displayName = 'TrackInfo'
export default TrackInfo