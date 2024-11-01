import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPlaylist } from '../store/slices/playlistSlice'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import TrackList from '../components/TrackList'

function Playlist() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentPlaylist, loading, error } = useSelector((state) => state.playlists)

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.get(`/playlists/${id}`)
        dispatch(setCurrentPlaylist(response.data))
      } catch (err) {
        console.error('Error fetching playlist:', err)
      }
    }

    fetchPlaylist()
  }, [id, dispatch])

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    )
  }

  if (!currentPlaylist) return null

  return (
    <div className="space-y-6">
      <div className="flex items-end space-x-6 bg-gradient-to-b from-spotify-gray to-spotify-black p-8">
        <img
          src={currentPlaylist.coverImage}
          alt={currentPlaylist.name}
          className="w-60 h-60 shadow-lg"
        />
        <div>
          <p className="text-sm uppercase font-bold">Playlist</p>
          <h1 className="text-5xl font-bold mt-2 mb-6">{currentPlaylist.name}</h1>
          <div className="flex items-center text-sm text-spotify-light-gray">
            <img
              src={currentPlaylist.creatorAvatar || '/default-avatar.png'}
              alt={currentPlaylist.creator}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="font-bold text-white">{currentPlaylist.creator}</span>
            <span className="mx-1">•</span>
            <span>{currentPlaylist.tracks?.length || 0} songs</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {currentPlaylist.tracks && <TrackList tracks={currentPlaylist.tracks} />}
      </div>
    </div>
  )
}

export default Playlist