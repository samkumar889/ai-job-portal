
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiFileText, FiSearch, FiBriefcase, FiUser } from 'react-icons/fi'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  const quickActions = [
    {
      icon: <FiFileText className="text-4xl" />,
      title: 'Resume Analyzer',
      description: 'Analyze your resume and get AI feedback',
      link: '/resume-analyzer',
    },
    {
      icon: <FiSearch className="text-4xl" />,
      title: 'Browse Jobs',
      description: 'Find and apply for jobs',
      link: '/jobs',
    },
    {
      icon: <FiBriefcase className="text-4xl" />,
      title: 'My Applications',
      description: 'View your job applications',
      link: '/dashboard',
    },
    {
      icon: <FiUser className="text-4xl" />,
      title: 'My Profile',
      description: 'Update your profile',
      link: '/profile',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold mb-3">Welcome back, {user?.name}!</h1>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            What would you like to do today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link
                to={action.link}
                className={`block p-8 rounded-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-black border-gray-800 hover:border-white' : 'bg-white border-gray-200 hover:border-black'}`}
              >
                <div className="inline-flex p-4 rounded-xl bg-gray-100 dark:bg-gray-900 mb-5">
                  {action.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{action.title}</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
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
