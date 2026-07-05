
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiArrowRight, FiUpload, FiSearch, FiBarChart2 } from 'react-icons/fi'

const Home = () => {
  const { darkMode } = useSelector((state) => state.theme)

  const features = [
    {
      icon: <FiUpload className="text-4xl text-cream-500" />,
      title: 'Resume Analysis',
      description: 'Upload your resume and get AI-powered feedback, ATS score, and skill suggestions.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    },
    {
      icon: <FiSearch className="text-4xl text-cream-500" />,
      title: 'Job Search',
      description: 'Find your dream job with our advanced search and filtering options.',
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&q=80',
    },
    {
      icon: <FiBarChart2 className="text-4xl text-cream-500" />,
      title: 'Analytics Dashboard',
      description: 'Track your job applications and get insights into your job search.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Job Portal Hero"
            className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl mb-8 object-cover h-[200px] sm:h-[300px] md:h-[400px]"
          />
        </div>
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>
          Find Your Dream Job with <span className="gradient-text">AI Power</span>
        </h1>
        <p className={`text-lg sm:text-xl mb-8 ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>
          Revolutionize your job search with AI-powered resume analysis, job matching, and interview preparation.
        </p>
        <div className="flex justify-center flex-col sm:flex-row gap-4">
          <Link
            to="/signup"
            className="btn-cream px-8 py-3 text-onyx-900 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 font-semibold"
          >
            <span>Get Started</span>
            <FiArrowRight className="text-lg" />
          </Link>
          <Link
            to="/jobs"
            className={`px-8 py-3 rounded-lg border-2 font-semibold transition-all-smooth ${
              darkMode
                ? 'border-onyx-600 text-cream-100 hover:bg-onyx-800 hover:border-cream-500'
                : 'border-cream-300 text-onyx-800 hover:bg-cream-100 hover:border-cream-500'
            }`}
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
            whileHover={{ y: -5, scale: 1.02 }}
            className={`rounded-xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-lg overflow-hidden card-hover`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="p-8">
              <div className="mb-4 inline-flex p-4 rounded-xl bg-cream-100 dark:bg-onyx-700">
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>{feature.title}</h3>
              <p className={darkMode ? 'text-onyx-300' : 'text-onyx-600'}>{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`p-8 rounded-xl text-center ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-lg`}
      >
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Ready to start your job search?</h2>
        <p className={`text-lg mb-6 ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>
          Join thousands of job seekers who have found their dream jobs with JobPortal AI.
        </p>
        <Link
          to="/signup"
          className="inline-block btn-cream px-8 py-3 text-onyx-900 rounded-lg font-semibold"
        >
          Create Account
        </Link>
      </motion.div>
    </div>
  )
}

export default Home
