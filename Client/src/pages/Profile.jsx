import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, logout } from '../store/slices/authSlice'
import { PencilIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

function Profile() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { likedTracks } = useSelector((state) => state.player)
  const { playlists } = useSelector((state) => state.playlists)
  
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.put('/users/profile', formData)
      dispatch(updateProfile(response.data))
      setIsEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-b from-spotify-gray to-spotify-black p-8 rounded-lg">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt={user?.name}
              className="w-40 h-40 rounded-full object-cover"
            />
            {isEditing && (
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
                className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm p-2"
              />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">{user?.name}</h1>
              <div className="space-x-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-spotify-gray rounded-full transition-colors"
                >
                  <PencilIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-spotify-gray rounded-full transition-colors text-red-500"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-6 text-spotify-light-gray">
              <div>
                <span className="font-bold text-white">{playlists.length}</span> Playlists
              </div>
              <div>
                <span className="font-bold text-white">{likedTracks.length}</span> Liked Songs
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md">
          {error}
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-spotify-gray p-6 rounded-lg space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-spotify-black text-white rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-spotify-green"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-spotify-black text-white rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-spotify-green"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-white hover:text-spotify-green transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-spotify-green text-black rounded-full 
                       hover:scale-105 transition-transform"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-spotify-gray p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 text-spotify-light-gray"
              >
                <div className="w-10 h-10 rounded bg-spotify-black flex items-center justify-center">
                  {activity.icon}
                </div>
                <div>
                  <div className="text-white">{activity.title}</div>
                  <div className="text-sm">{activity.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-spotify-gray p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Private Account</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-spotify-black rounded-full peer 
                              peer-checked:after:translate-x-full peer-checked:bg-spotify-green
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                              after:bg-white after:rounded-full after:h-5 after:w-5
                              after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-spotify-black rounded-full peer 
                              peer-checked:after:translate-x-full peer-checked:bg-spotify-green
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                              after:bg-white after:rounded-full after:h-5 after:w-5
                              after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Temporary data for development
const recentActivity = [
  {
    icon: '🎵',
    title: 'Liked a new song',
    timestamp: '2 hours ago',
  },
  {
    icon: '📝',
    title: 'Created a new playlist',
    timestamp: '1 day ago',
  },
  {
    icon: '👥',
    title: 'Followed an artist',
    timestamp: '3 days ago',
  },
]

export default Profile