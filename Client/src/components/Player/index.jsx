import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player'
import {
  togglePlay,
  nextTrack,
  previousTrack,
  setVolume,
  toggleLike,
} from '../../store/slices/playerSlice'
import AudioControls from './AudioControls'
import TrackInfo from './TrackInfo'
import VolumeControl from '../VolumeControl'

function Player() {
  const dispatch = useDispatch()
  const { currentTrack, isPlaying, volume, likedTracks } = useSelector((state) => state.player)

  const handlePlayPause = useCallback(() => dispatch(togglePlay()), [dispatch])
  const handleNext = useCallback(() => dispatch(nextTrack()), [dispatch])
  const handlePrevious = useCallback(() => dispatch(previousTrack()), [dispatch])
  const handleVolumeChange = useCallback((vol) => dispatch(setVolume(vol)), [dispatch])
  const handleLike = useCallback(() => dispatch(toggleLike(currentTrack)), [dispatch, currentTrack])

  if (!currentTrack) return null

  const isLiked = likedTracks.some(track => track.id === currentTrack.id)

  return (
    <div className="h-20 bg-rhythmix-gray border-t border-rhythmix-light-gray flex items-center px-4">
      <TrackInfo
        track={currentTrack}
        isLiked={isLiked}
        onLike={handleLike}
      />
      
      <div className="w-1/3 flex flex-col items-center">
        <AudioControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
        <AudioPlayer
          src={currentTrack.url}
          autoPlay={isPlaying}
          showJumpControls={false}
          customProgressBarSection={['CURRENT_TIME', 'PROGRESS_BAR', 'DURATION']}
          customControlsSection={[]}
          volume={volume}
          onPlay={handlePlayPause}
          onPause={handlePlayPause}
          onVolumeChange={(e) => handleVolumeChange(e.target.volume)}
          className="rhythmix-player"
        />
      </div>

      <div className="w-1/3 flex justify-end">
        <VolumeControl volume={volume} onChange={handleVolumeChange} />
      </div>
    </div>
  )
}

export default Player