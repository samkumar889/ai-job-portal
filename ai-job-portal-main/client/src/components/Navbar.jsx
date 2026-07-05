
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { toggleDarkMode } from '../redux/slices/themeSlice'
import { FiMoon, FiSun, FiLogOut, FiUser, FiBriefcase, FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    dispatch(logout())
    setDropdownOpen(false)
    navigate('/')
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-black border-b border-gray-800' : 'bg-white border-b border-gray-200'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <FiBriefcase className="text-3xl" />
            <span className="text-2xl font-bold tracking-tight">JobPortal AI</span>
          </Link>

          <div className="flex items-center gap-5">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-3 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <FiSun className="text-2xl" /> : <FiMoon className="text-2xl" />}
            </button>

            {token ? (
              <>
                <Link
                  to="/"
                  className={`px-5 py-2.5 rounded-xl font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className={`px-5 py-2.5 rounded-xl font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  Jobs
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-5 py-2.5 rounded-xl font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  Dashboard
                </Link>
                {user?.role === 'recruiter' && (
                  <Link
                    to="/recruiter-dashboard"
                    className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-xl font-medium hover:scale-105 transition-all duration-300"
                  >
                    Recruiter Dashboard
                  </Link>
                )}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <FiUser className="text-xl" />
                    <span>{user?.name}</span>
                    <FiChevronDown className={`text-sm transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-3 w-56 rounded-xl shadow-2xl overflow-hidden ${darkMode ? 'bg-black border border-gray-800' : 'bg-white border border-gray-200'}`}
                      >
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className={`block px-5 py-3 font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left px-5 py-3 flex items-center gap-2 font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                        >
                          <FiLogOut />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`px-5 py-2.5 rounded-xl font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className={`px-5 py-2.5 rounded-xl font-medium ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-xl font-medium hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
