import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  PlusCircleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { i18n } from '@/shared/lib/i18n'
import LanguageSwitch from './LanguageSwitch'

function Sidebar() {
  const location = useLocation()
  const { playlists } = useSelector((state) => state.playlists)
  const { user } = useSelector((state) => state.auth)

  const navigation = [
    { name: i18n.t('common.home'), icon: HomeIcon, path: '/' },
    { name: i18n.t('common.search'), icon: MagnifyingGlassIcon, path: '/search' },
    { name: i18n.t('common.library'), icon: BookmarkIcon, path: '/library' },
  ]

  return (
    <div className="w-64 bg-rhythmix-black/95 backdrop-blur-md border-r border-white/10">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-wasabi-400 to-wasabi-600 
                         bg-clip-text text-transparent group-hover:from-wasabi-300 
                         group-hover:to-wasabi-500 transition-all duration-300">
            Rhythmix
          </span>
        </Link>
      </div>

      <nav className="px-2 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}

        <div className="pt-6">
          <button className="nav-link w-full group">
            <PlusCircleIcon className="h-5 w-5 group-hover:text-wasabi-500" />
            <span>{i18n.t('common.createPlaylist')}</span>
          </button>
          <Link to="/liked" className="nav-link group">
            <HeartIcon className="h-5 w-5 group-hover:text-wasabi-500" />
            <span>{i18n.t('common.likedSongs')}</span>
          </Link>
        </div>

        <div className="border-t border-white/10 my-4" />

        <div className="space-y-1 max-h-[calc(100vh-500px)] overflow-y-auto hide-scrollbar">
          {Array.isArray(playlists) && playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="nav-link truncate"
            >
              {playlist.name}
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 my-4" />
        
        <div className="px-4">
          <LanguageSwitch />
        </div>
      </nav>

      {user && (
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-rhythmix-black/95">
          <Link
            to="/profile"
            className="flex items-center space-x-3 hover:bg-white/5 p-2 rounded-lg 
                     transition-all duration-200"
          >
            <img
              src={user.avatar || '/default-avatar.png'}
              alt={user.name}
              className="h-8 w-8 rounded-full ring-2 ring-wasabi-500/50"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-400">{i18n.t('common.profile')}</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Sidebar