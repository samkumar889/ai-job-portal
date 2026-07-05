
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { toggleDarkMode } from '../redux/slices/themeSlice'
import { FiMoon, FiSun, FiLogOut, FiUser, FiBriefcase, FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg ${darkMode ? 'bg-onyx-900/80 border-b border-onyx-700' : 'bg-cream-50/80 border-b border-cream-200'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FiBriefcase className="text-2xl text-cream-500" />
            <span className="text-xl font-bold">JobPortal AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-3 rounded-lg transition-all-smooth ${darkMode ? 'hover:bg-onyx-700 text-cream-100' : 'hover:bg-cream-100 text-onyx-800'}`}
            >
              {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </button>

            {token ? (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className={`px-4 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Jobs
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Dashboard
                </Link>
                {user?.role === 'recruiter' && (
                  <Link
                    to="/recruiter-dashboard"
                    className="btn-cream px-4 py-2 text-onyx-900 rounded-lg font-semibold"
                  >
                    Recruiter Dashboard
                  </Link>
                )}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                  >
                    <FiUser className="text-xl" />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'}`}>
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className={`block px-4 py-3 transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-3 flex items-center space-x-2 transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                      >
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-cream px-4 py-2 text-onyx-900 rounded-lg font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-3 rounded-lg transition-all-smooth ${darkMode ? 'hover:bg-onyx-700 text-cream-100' : 'hover:bg-cream-100 text-onyx-800'}`}
            >
              {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-3 rounded-lg transition-all-smooth ${darkMode ? 'hover:bg-onyx-700 text-cream-100' : 'hover:bg-cream-100 text-onyx-800'}`}
            >
              {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`py-4 border-t ${darkMode ? 'border-onyx-700' : 'border-cream-200'}`}>
            {token ? (
              <div className="space-y-3">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Jobs
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Dashboard
                </Link>
                {user?.role === 'recruiter' && (
                  <Link
                    to="/recruiter-dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-cream block px-3 py-2 text-onyx-900 rounded-lg font-semibold"
                  >
                    Recruiter Dashboard
                  </Link>
                )}
                <div className="pt-3 border-t border-dashed" style={{ borderColor: darkMode ? '#494c55' : '#e2e8f0' }}>
                  <div className="flex items-center justify-between px-3 py-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-xl" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <FiLogOut />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-cream block px-3 py-2 text-onyx-900 rounded-lg font-semibold text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
