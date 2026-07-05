
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiArrowRight, FiUpload, FiSearch, FiBarChart2 } from 'react-icons/fi'

const Home = () => {
  const { darkMode } = useSelector((state) => state.theme)

  const features = [
    {
      icon: <FiUpload className="text-4xl text-blue-600" />,
      title: 'Resume Analysis',
      description: 'Upload your resume and get AI-powered feedback, ATS score, and skill suggestions.',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20resume%20review%20and%20analysis%20with%20AI%20interface&image_size=landscape_16_9',
    },
    {
      icon: <FiSearch className="text-4xl text-blue-600" />,
      title: 'Job Search',
      description: 'Find your dream job with our advanced search and filtering options.',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20job%20search%20portal%20interface%20with%20job%20listings&image_size=landscape_16_9',
    },
    {
      icon: <FiBarChart2 className="text-4xl text-blue-600" />,
      title: 'Analytics Dashboard',
      description: 'Track your job applications and get insights into your job search.',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=business%20analytics%20dashboard%20with%20charts%20and%20data%20visualization&image_size=landscape_16_9',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="mb-8">
          <img
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20job%20portal%20hero%20image%20with%20diverse%20people%20and%20technology&image_size=landscape_16_9"
            alt="Job Portal Hero"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl mb-8"
          />
        </div>
        <h1 className="text-5xl font-bold mb-6">
          Find Your Dream Job with <span className="text-blue-600">AI Power</span>
        </h1>
        <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Revolutionize your job search with AI-powered resume analysis, job matching, and interview preparation.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <FiArrowRight />
          </Link>
          <Link
            to="/jobs"
            className={`px-8 py-3 rounded-lg border-2 ${darkMode ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            Browse Jobs
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-8">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`p-8 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to start your job search?</h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Join thousands of job seekers who have found their dream jobs with JobPortal AI.
        </p>
        <Link
          to="/signup"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Account
        </Link>
      </motion.div>
    </div>
  )
}

export default Home
