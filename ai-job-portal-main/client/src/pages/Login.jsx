
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../redux/slices/authSlice'
import { motion } from 'framer-motion'
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi'

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`w-full max-w-md p-12 rounded-3xl border shadow-2xl ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-10"
        >
          <motion.div variants={itemVariants} className="inline-block p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 mb-6">
            <FiLock className="text-5xl" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl font-extrabold mb-3">
            Welcome Back
          </motion.h2>
          <motion.p variants={itemVariants} className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to your account
          </motion.p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-5 rounded-2xl border ${darkMode ? 'bg-red-950 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}
          >
            {error}
          </motion.div>
        )}

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          <motion.div variants={itemVariants}>
            <label className="block mb-3 font-semibold text-lg flex items-center gap-2">
              <FiMail className="text-xl" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-6 py-5 rounded-2xl border-2 focus:outline-none focus:scale-[1.02] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
              placeholder="Enter your email"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-3 font-semibold text-lg flex items-center gap-2">
              <FiLock className="text-xl" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-6 py-5 rounded-2xl border-2 focus:outline-none focus:scale-[1.02] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
              placeholder="Enter your password"
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
            type="submit"
            disabled={loading}
            className="w-full px-6 py-5 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            {!loading && <FiArrowRight />}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg">
            Don't have an account?{' '}
            <Link to="/signup" className="font-extrabold text-xl underline underline-offset-4 hover:opacity-80 transition-opacity">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
