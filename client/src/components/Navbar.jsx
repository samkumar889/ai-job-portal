
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { toggleDarkMode } from '../redux/slices/themeSlice'
import { FiMoon, FiSun, FiLogOut, FiUser, FiBriefcase } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg ${darkMode ? 'bg-onyx-900/80 border-b border-onyx-700' : 'bg-cream-50/80 border-b border-cream-200'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FiBriefcase className="text-2xl text-cream-500" />
            <span className="text-xl font-bold">JobPortal AI</span>
          </Link>

          <div className="flex items-center space-x-4">
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
                <div className="relative group">
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all-smooth ${darkMode ? 'text-cream-100 hover:bg-onyx-700' : 'text-onyx-800 hover:bg-cream-100'}`}>
                    <FiUser className="text-xl" />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} hidden group-hover:block transition-all-smooth`}>
                    <Link
                      to="/profile"
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
