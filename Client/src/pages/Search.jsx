import { useState, useEffect } from 'react'
import SearchInput from '../components/SearchInput'
import TrackList from '../components/TrackList'
import PlaylistCard from '../components/PlaylistCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useDispatch } from 'react-redux'
import api from '../services/api'

function Search() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    playlists: [],
    artists: [],
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const dispatch = useDispatch()

  useEffect(() => {
    const searchDebounce = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true)
        try {
          const response = await api.get(`/search?q=${encodeURIComponent(query)}&type=${activeTab}`)
          setSearchResults(response.data)
        } catch (error) {
          console.error('Search failed:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setSearchResults({ tracks: [], playlists: [], artists: [] })
      }
    }, 500)

    return () => clearTimeout(searchDebounce)
  }, [query, activeTab])

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tracks', label: 'Songs' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
  ]

  return (
    <div className="p-6 space-y-6">
      <SearchInput value={query} onChange={setQuery} />

      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-8">
          {searchResults.tracks.length > 0 && (activeTab === 'all' || activeTab === 'tracks') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
              <TrackList tracks={searchResults.tracks} />
            </section>
          )}

          {searchResults.playlists.length > 0 && (activeTab === 'all' || activeTab === 'playlists') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}

          {searchResults.artists.length > 0 && (activeTab === 'all' || activeTab === 'artists') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="bg-spotify-gray p-4 rounded-lg hover:bg-opacity-80 transition-all duration-200"
                  >
                    <img
                      src={artist.image || '/default-artist.png'}
                      alt={artist.name}
                      className="w-full aspect-square rounded-full object-cover mb-4"
                    />
                    <h3 className="font-bold text-white text-center truncate">
                      {artist.name}
                    </h3>
                    <p className="text-spotify-light-gray text-sm text-center">
                      Artist
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {query && !loading && !Object.values(searchResults).some(arr => arr.length > 0) && (
            <div className="text-center text-spotify-light-gray py-12">
              <p className="text-lg">No results found for "{query}"</p>
              <p className="text-sm mt-2">
                Try searching with different keywords or check your spelling
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search