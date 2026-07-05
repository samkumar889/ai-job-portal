
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../redux/slices/authSlice'
import { motion } from 'framer-motion'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000)
    }
  }, [user, error, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-10 rounded-2xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-xl`}
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                darkMode
                  ? 'bg-onyx-700 border-onyx-600 text-cream-100 placeholder-onyx-400'
                  : 'bg-cream-50 border-cream-300 text-onyx-900 placeholder-onyx-500'
              }`}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-8">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                darkMode
                  ? 'bg-onyx-700 border-onyx-600 text-cream-100 placeholder-onyx-400'
                  : 'bg-cream-50 border-cream-300 text-onyx-900 placeholder-onyx-500'
              }`}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-cream w-full px-8 py-3 text-onyx-900 font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link to="/forgot-password" className="text-cream-500 hover:underline text-sm">
            Forgot Password?
          </Link>
        </p>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-cream-500 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
