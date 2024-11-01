import { useDispatch, useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, HeartIcon } from '@heroicons/react/24/solid'
import { setCurrentTrack, togglePlay, toggleLike } from '../store/slices/playerSlice'

function TrackList({ tracks }) {
  const dispatch = useDispatch()
  const { currentTrack, isPlaying, likedTracks } = useSelector((state) => state.player)

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      dispatch(togglePlay())
    } else {
      dispatch(setCurrentTrack(track))
      dispatch(togglePlay())
    }
  }

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const isTrackPlaying = (track) => {
    return currentTrack?.id === track.id && isPlaying
  }

  const isTrackLiked = (track) => {
    return likedTracks.some(likedTrack => likedTrack.id === track.id)
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[16px_1fr_1fr_1fr_minmax(120px,1fr)] gap-4 
                    px-4 py-2 text-gray-400 text-sm border-b border-white/10">
        <div>#</div>
        <div>タイトル</div>
        <div>アルバム</div>
        <div>追加日</div>
        <div className="text-right">時間</div>
      </div>
      
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="grid grid-cols-[16px_1fr_1fr_1fr_minmax(120px,1fr)] gap-4 
                   px-4 py-2 hover:bg-white/5 rounded-lg group items-center 
                   transition-colors duration-200"
        >
          <div className="relative">
            <span className="group-hover:hidden">{index + 1}</span>
            <button
              onClick={() => handlePlayTrack(track)}
              className="hidden group-hover:block text-wasabi-500 
                       hover:text-wasabi-400 transition-colors"
            >
              {isTrackPlaying(track) ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </button>
          </div>
          
          <div className="flex items-center min-w-0">
            <img
              src={track.albumCover || '/default-album.png'}
              alt={track.title}
              className="w-10 h-10 rounded mr-3"
            />
            <div className="min-w-0">
              <p className={`font-medium truncate ${
                isTrackPlaying(track) ? 'text-wasabi-500' : 'text-white'
              }`}>
                {track.title}
              </p>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
          </div>
          
          <div className="text-gray-400 truncate">
            {track.album}
          </div>
          
          <div className="text-gray-400">
            {track.dateAdded}
          </div>
          
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={() => dispatch(toggleLike(track))}
              className={`opacity-0 group-hover:opacity-100 transition-opacity 
                       ${isTrackLiked(track) ? 'text-wasabi-500' : 
                       'text-gray-400 hover:text-wasabi-500'}`}
            >
              <HeartIcon className="h-5 w-5" />
            </button>
            <span>{formatDuration(track.duration)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrackList