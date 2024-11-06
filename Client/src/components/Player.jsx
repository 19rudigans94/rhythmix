import { useSelector, useDispatch } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player'
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  HeartIcon,
} from '@heroicons/react/24/solid'
import {
  togglePlay,
  nextTrack,
  previousTrack,
  setVolume,
  toggleLike,
} from '@/app/store/slices/playerSlice'
import 'react-h5-audio-player/lib/styles.css'

function Player() {
  const dispatch = useDispatch()
  const { currentTrack, isPlaying, volume, likedTracks } = useSelector((state) => state.player)

  if (!currentTrack) return null

  const isLiked = likedTracks.some(track => track.id === currentTrack.id)

  const handleLike = () => {
    dispatch(toggleLike(currentTrack))
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-20 bg-rhythmix-gray border-t border-rhythmix-light-gray flex items-center px-4">
      <div className="flex items-center w-1/3">
        <img
          src={currentTrack.albumCover}
          alt={currentTrack.title}
          className="h-14 w-14 rounded"
        />
        <div className="ml-4">
          <div className="text-sm text-white">{currentTrack.title}</div>
          <div className="text-xs text-rhythmix-light-gray">
            {currentTrack.artist}
          </div>
        </div>
        <button
          onClick={handleLike}
          className={`ml-4 p-2 rounded-full hover:bg-rhythmix-black transition-colors ${
            isLiked ? 'text-rhythmix-green' : 'text-rhythmix-light-gray'
          }`}
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="w-1/3">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(previousTrack())}
              className="p-2 text-rhythmix-light-gray hover:text-white transition-colors"
            >
              <BackwardIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => dispatch(togglePlay())}
              className="p-3 bg-white rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5 text-black" />
              ) : (
                <PlayIcon className="h-5 w-5 text-black" />
              )}
            </button>
            <button
              onClick={() => dispatch(nextTrack())}
              className="p-2 text-rhythmix-light-gray hover:text-white transition-colors"
            >
              <ForwardIcon className="h-5 w-5" />
            </button>
          </div>
          <AudioPlayer
            src={currentTrack.url}
            autoPlay={isPlaying}
            showJumpControls={false}
            customProgressBarSection={[
              'CURRENT_TIME',
              'PROGRESS_BAR',
              'DURATION',
            ]}
            customControlsSection={[]}
            volume={volume}
            onPlay={() => dispatch(togglePlay())}
            onPause={() => dispatch(togglePlay())}
            onVolumeChange={(e) => dispatch(setVolume(e.target.volume))}
            timeFormat={formatTime}
            className="rhythmix-player"
          />
        </div>
      </div>

      <div className="w-1/3 flex justify-end items-center">
        <SpeakerWaveIcon className="h-5 w-5 text-rhythmix-light-gray mr-2" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
          className="w-24 accent-rhythmix-green"
        />
      </div>
    </div>
  )
}

export default Player