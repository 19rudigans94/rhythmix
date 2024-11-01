import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function CreatePlaylistModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true,
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-spotify-gray rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Playlist</h2>
          <button
            onClick={onClose}
            className="text-spotify-light-gray hover:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 bg-spotify-black text-white rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-spotify-green"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="h-4 w-4 text-spotify-green rounded focus:ring-spotify-green"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm">
              Make playlist public
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white hover:text-spotify-green transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-spotify-green text-black rounded-full 
                       hover:scale-105 transition-transform"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePlaylistModal