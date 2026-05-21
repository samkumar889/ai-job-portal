
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
      color: 'blue',
    },
    {
      icon: <FiSearch className="text-3xl" />,
      title: 'Browse Jobs',
      description: 'Find and apply for jobs',
      link: '/jobs',
      color: 'green',
    },
    {
      icon: <FiBriefcase className="text-3xl" />,
      title: 'My Applications',
      description: 'View your job applications',
      link: '/dashboard',
      color: 'purple',
    },
    {
      icon: <FiUser className="text-3xl" />,
      title: 'My Profile',
      description: 'Update your profile',
      link: '/profile',
      color: 'orange',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            What would you like to do today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={action.link}
                className={`block p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  action.color === 'green' ? 'bg-green-100 text-green-600' :
                  action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
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
