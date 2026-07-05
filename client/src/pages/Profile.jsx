
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'
import { API_BASE_URL } from '../utils/api'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    skills: '',
    experience: '',
    education: '',
  })
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`, config)
      const userData = response.data.user
      setUser(userData)
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        bio: userData.bio || '',
        skills: userData.skills?.join(', ') || '',
        experience: userData.experience || '',
        education: userData.education || '',
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const updateData = {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()),
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/user/update`,
        updateData,
        config
      )
      setUser(response.data.user)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-10 rounded-2xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-xl`}
      >
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>My Profile</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                  darkMode
                    ? 'bg-onyx-700 border-onyx-600 text-cream-100'
                    : 'bg-cream-50 border-cream-300 text-onyx-900'
                }`}
              />
            </div>
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className={`w-full px-4 py-3 rounded-xl border ${
                  darkMode
                    ? 'bg-onyx-700 border-onyx-600 text-onyx-300 opacity-50'
                    : 'bg-cream-50 border-cream-300 text-onyx-600 opacity-50'
                }`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                darkMode
                  ? 'bg-onyx-700 border-onyx-600 text-cream-100'
                  : 'bg-cream-50 border-cream-300 text-onyx-900'
              }`}
            />
          </div>

          <div className="mb-4">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Skills (comma-separated)</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                darkMode
                  ? 'bg-onyx-700 border-onyx-600 text-cream-100'
                  : 'bg-cream-50 border-cream-300 text-onyx-900'
              }`}
            />
          </div>

          <div className="mb-4">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Experience</label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                darkMode
                  ? 'bg-onyx-700 border-onyx-600 text-cream-100'
                  : 'bg-cream-50 border-cream-300 text-onyx-900'
              }`}
            />
          </div>

          <div className="mb-4">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Education</label>
            <textarea
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                darkMode
                  ? 'bg-onyx-700 border-onyx-600 text-cream-100'
                  : 'bg-cream-50 border-cream-300 text-onyx-900'
              }`}
            />
          </div>

          {user?.resume && (
            <div className="mb-6">
              <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Uploaded Resume</label>
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 btn-cream text-onyx-900 font-semibold rounded-xl"
              >
                View Resume
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-cream w-full px-8 py-4 text-onyx-900 font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Profile
