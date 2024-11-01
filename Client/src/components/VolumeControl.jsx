import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { setVolume } from '../store/slices/playerSlice'

function VolumeControl({ volume: initialVolume }) {
  const dispatch = useDispatch()
  const [volume, setLocalVolume] = useState(initialVolume)
  const [previousVolume, setPreviousVolume] = useState(initialVolume)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!isMuted) {
      dispatch(setVolume(volume))
    }
  }, [volume, isMuted, dispatch])

  const handleMuteToggle = () => {
    if (isMuted) {
      setLocalVolume(previousVolume)
      setIsMuted(false)
    } else {
      setPreviousVolume(volume)
      setLocalVolume(0)
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setLocalVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleMuteToggle}
        className="text-spotify-light-gray hover:text-white transition-colors"
      >
        {isMuted || volume === 0 ? (
          <SpeakerXMarkIcon className="h-5 w-5" />
        ) : (
          <SpeakerWaveIcon className="h-5 w-5" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 accent-spotify-green"
      />
    </div>
  )
}

export default VolumeControl