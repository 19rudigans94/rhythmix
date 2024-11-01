import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylistsStart, fetchPlaylistsSuccess, fetchPlaylistsFailure } from '../store/slices/playlistSlice'
import PlaylistCard from '../components/PlaylistCard'
import NearbyListeners from '@/features/nearby-listeners/components/NearbyListeners'
import api from '../services/api'
import { i18n } from '@/shared/lib/i18n'

function Home() {
  const dispatch = useDispatch()
  const { playlists, loading, error } = useSelector((state) => state.playlists)

  useEffect(() => {
    const fetchPlaylists = async () => {
      dispatch(fetchPlaylistsStart())
      try {
        const response = await api.get('/playlists')
        dispatch(fetchPlaylistsSuccess(response.data))
      } catch (err) {
        dispatch(fetchPlaylistsFailure(err.message))
      }
    }

    fetchPlaylists()
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loading-wasabi"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-wasabi p-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-8">
        <section>
          <h1 className="text-3xl font-bold text-white mb-6">
            {i18n.t('common.featuredPlaylists')}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(playlists) && playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
            {(!Array.isArray(playlists) || playlists.length === 0) && (
              <p className="text-gray-400 col-span-full text-center py-8">
                {i18n.t('common.noPlaylists')}
              </p>
            )}
          </div>
        </section>
      </div>
      
      <div className="lg:col-span-1">
        <NearbyListeners />
      </div>
    </div>
  )
}

export default Home