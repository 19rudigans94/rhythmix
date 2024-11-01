import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { PlayIcon, PauseIcon, HeartIcon } from '@heroicons/react/24/solid'
import { setCurrentTrack, togglePlay } from '../store/slices/playerSlice'

function PlaylistHeader({ playlist, isPlaying, isLiked, onLike }) {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)

  const handlePlay = () => {
    if (playlist.tracks && playlist.tracks.length > 0) {
      dispatch(setCurrentTrack(playlist.tracks[0]))
      dispatch(togglePlay())
    }
  }

  return (
    <div className="flex items-end space-x-6 bg-gradient-to-b from-spotify-gray to-spotify-black p-8">
      <div 
        className="relative w-60 h-60 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={playlist.coverImage}
          alt={playlist.name}
          className="w-full h-full object-cover shadow-lg"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="p-4 bg-spotify-green rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <PauseIcon className="h-8 w-8 text-black" />
              ) : (
                <PlayIcon className="h-8 w-8 text-black" />
              )}
            </button>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <p className="text-sm uppercase font-bold">Playlist</p>
        <h1 className="text-5xl font-bold mt-2 mb-6">{playlist.name}</h1>
        <div className="flex items-center space-x-4">
          <img
            src={playlist.creatorAvatar || '/default-avatar.png'}
            alt={playlist.creator}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-bold">{playlist.creator}</span>
          <span className="text-spotify-light-gray">•</span>
          <span className="text-spotify-light-gray">
            {playlist.tracks?.length || 0} songs
          </span>
          <button
            onClick={onLike}
            className={`ml-2 hover:scale-110 transition-transform ${
              isLiked ? 'text-spotify-green' : 'text-spotify-light-gray'
            }`}
          >
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaylistHeader