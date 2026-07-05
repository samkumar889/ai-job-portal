
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiFileText, FiSearch, FiBriefcase, FiUser } from 'react-icons/fi'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  const quickActions = [
    {
      icon: <FiFileText className="text-3xl" />,
      title: 'Resume Analyzer',
      description: 'Analyze your resume and get AI feedback',
      link: '/resume-analyzer',
    },
    {
      icon: <FiSearch className="text-3xl" />,
      title: 'Browse Jobs',
      description: 'Find and apply for jobs',
      link: '/jobs',
    },
    {
      icon: <FiBriefcase className="text-3xl" />,
      title: 'My Applications',
      description: 'View your job applications',
      link: '/dashboard',
    },
    {
      icon: <FiUser className="text-3xl" />,
      title: 'My Profile',
      description: 'Update your profile',
      link: '/profile',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-10">
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Welcome back, {user?.name}!</h1>
          <p className={`text-lg ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>
            What would you like to do today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-hover"
            >
              <Link
                to={action.link}
                className={`block p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'}`}
              >
                <div className="inline-flex p-4 rounded-2xl bg-cream-100 mb-4">
                  <span className="text-cream-600">{action.icon}</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>{action.title}</h3>
                <p className={`${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>
                  {action.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
