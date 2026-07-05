
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`p-10 rounded-2xl border shadow-xl ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}
      >
        <h1 className="text-4xl font-extrabold mb-10">My Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 font-semibold text-lg">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:scale-[1.01] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
              />
            </div>
            <div>
              <label className="block mb-3 font-semibold text-lg">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className={`w-full px-5 py-4 rounded-xl border-2 cursor-not-allowed ${darkMode ? 'bg-gray-900 border-gray-700 opacity-60' : 'bg-gray-50 border-gray-300 opacity-60'}`}
              />
            </div>
          </div>

          <div>
            <label className="block mb-3 font-semibold text-lg">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:scale-[1.01] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
            />
          </div>

          <div>
            <label className="block mb-3 font-semibold text-lg">Skills (comma-separated)</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              rows={3}
              className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:scale-[1.01] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
            />
          </div>

          <div>
            <label className="block mb-3 font-semibold text-lg">Experience</label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              rows={4}
              className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:scale-[1.01] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
            />
          </div>

          <div>
            <label className="block mb-3 font-semibold text-lg">Education</label>
            <textarea
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              rows={4}
              className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:scale-[1.01] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
            />
          </div>

          {user?.resume && (
            <div className="mb-8">
              <label className="block mb-3 font-semibold text-lg">Uploaded Resume</label>
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                View Resume
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Profile
