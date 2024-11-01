import { memo } from 'react'
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid'

const AudioControls = memo(({ isPlaying, onPlayPause, onNext, onPrevious }) => (
  <div className="flex items-center space-x-4">
    <button
      onClick={onPrevious}
      className="p-2 text-rhythmix-light-gray hover:text-white transition-colors"
    >
      <BackwardIcon className="h-5 w-5" />
    </button>
    <button
      onClick={onPlayPause}
      className="p-3 bg-white rounded-full hover:scale-105 transition-transform"
    >
      {isPlaying ? (
        <PauseIcon className="h-5 w-5 text-black" />
      ) : (
        <PlayIcon className="h-5 w-5 text-black" />
      )}
    </button>
    <button
      onClick={onNext}
      className="p-2 text-rhythmix-light-gray hover:text-white transition-colors"
    >
      <ForwardIcon className="h-5 w-5" />
    </button>
  </div>
))

AudioControls.displayName = 'AudioControls'
export default AudioControls