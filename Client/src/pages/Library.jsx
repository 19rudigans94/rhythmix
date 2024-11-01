import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlusIcon } from '@heroicons/react/24/outline'
import { addPlaylist } from '../store/slices/playlistSlice'
import PlaylistCard from '../components/PlaylistCard'
import CreatePlaylistModal from '../components/CreatePlaylistModal'
import { useNavigate } from 'react-router-dom'

function Library() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { playlists } = useSelector((state) => state.playlists)
  const { likedTracks } = useSelector((state) => state.player)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCreatePlaylist = async (playlistData) => {
    try {
      const response = await api.post('/playlists', playlistData)
      dispatch(addPlaylist(response.data))
      setIsModalOpen(false)
      navigate(`/playlist/${response.data.id}`)
    } catch (error) {
      console.error('Error creating playlist:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-spotify-green text-black px-4 py-2 rounded-full hover:scale-105 transition-transform"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Playlist</span>
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Liked Songs</h2>
        {likedTracks.length > 0 ? (
          <div className="bg-gradient-to-br from-purple-700 to-blue-900 p-6 rounded-lg cursor-pointer"
               onClick={() => navigate('/liked')}>
            <h3 className="text-3xl font-bold mb-2">Liked Songs</h3>
            <p className="text-spotify-light-gray">{likedTracks.length} songs</p>
          </div>
        ) : (
          <p className="text-spotify-light-gray">Songs you like will appear here</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
        {playlists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <p className="text-spotify-light-gray">Create your first playlist</p>
        )}
      </section>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  )
}

export default Library