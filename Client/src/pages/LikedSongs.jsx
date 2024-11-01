import React from 'react'
import { useSelector } from 'react-redux'
import { HeartIcon } from '@heroicons/react/24/solid'
import TrackList from '../components/TrackList'

function LikedSongs() {
  const { likedTracks } = useSelector((state) => state.player)

  return (
    <div className="space-y-6">
      <div className="flex items-end space-x-6 bg-gradient-to-b from-purple-700 to-spotify-black p-8">
        <div className="w-60 h-60 bg-gradient-to-br from-purple-700 to-blue-900 flex items-center justify-center">
          <HeartIcon className="h-24 w-24 text-white" />
        </div>
        <div>
          <p className="text-sm uppercase font-bold">Playlist</p>
          <h1 className="text-5xl font-bold mt-2 mb-6">Liked Songs</h1>
          <div className="flex items-center text-sm text-spotify-light-gray">
            <span className="font-bold text-white">{likedTracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {likedTracks.length > 0 ? (
          <TrackList tracks={likedTracks} />
        ) : (
          <div className="text-center text-spotify-light-gray py-8">
            <p className="text-lg">No liked songs yet</p>
            <p className="text-sm">Songs you like will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LikedSongs