import { Link } from 'react-router-dom'
import { PlayIcon } from '@heroicons/react/24/solid'

function PlaylistCard({ playlist }) {
  return (
    <Link
      to={`/playlist/${playlist.id}`}
      className="card-wasabi p-4 group relative overflow-hidden"
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <img
          src={playlist.imageUrl}
          alt={playlist.name}
          className="w-full h-full object-cover transform group-hover:scale-105 
                   transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300" />
        <button
          className="absolute bottom-4 right-4 bg-wasabi-500 rounded-full p-3 
                   opacity-0 translate-y-4 group-hover:opacity-100 
                   group-hover:translate-y-0 transition-all duration-300 
                   hover:bg-wasabi-400 transform hover:scale-105"
          aria-label="Play"
        >
          <PlayIcon className="h-6 w-6 text-black" />
        </button>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-bold text-white group-hover:text-wasabi-500 
                     transition-colors duration-200 truncate">
          {playlist.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 h-10">
          {playlist.description}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {playlist.trackCount} tracks
        </p>
      </div>

      <div className="absolute inset-0 ring-2 ring-wasabi-500/50 opacity-0 
                    group-hover:opacity-100 rounded-lg transition-opacity 
                    duration-300" />
    </Link>
  )
}

export default PlaylistCard