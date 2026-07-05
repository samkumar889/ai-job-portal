
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiArrowRight, FiUpload, FiSearch, FiBarChart2, FiSparkles } from 'react-icons/fi'

const Home = () => {
  const { darkMode } = useSelector((state) => state.theme)

  const features = [
    {
      icon: <FiUpload className="text-6xl" />,
      title: 'Resume Analysis',
      description: 'Upload your resume and get AI-powered feedback, ATS score, and skill suggestions.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop',
    },
    {
      icon: <FiSearch className="text-6xl" />,
      title: 'Job Search',
      description: 'Find your dream job with our advanced search and filtering options.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    },
    {
      icon: <FiBarChart2 className="text-6xl" />,
      title: 'Analytics Dashboard',
      description: 'Track your job applications and get insights into your job search.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    },
  ]

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center mb-28"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-12"
        >
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600&auto=format&fit=crop"
            alt="Job Portal Hero"
            className="w-full max-w-6xl mx-auto rounded-3xl shadow-2xl mb-12 object-cover h-[500px] animate-float"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FiSparkles className="text-3xl" />
            <h2 className="text-2xl font-bold tracking-wide uppercase opacity-70">Powered by AI</h2>
            <FiSparkles className="text-3xl" />
          </div>

          <h1 className="text-7xl md:text-8xl font-extrabold mb-8 tracking-tighter">
            Find Your Dream Job with
            <motion.span
              className="inline-block ml-3"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'linear-gradient(90deg, #000, #444, #000, #444)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI Power
            </motion.span>
          </h1>

          <p className={`text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Revolutionize your job search with AI-powered resume analysis, job matching, and interview preparation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link
                to="/signup"
                className="px-12 py-5 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
              >
                <span>Get Started</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                  <FiArrowRight />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link
                to="/jobs"
                className={`px-12 py-5 rounded-2xl border-2 font-bold text-xl hover:shadow-2xl transition-all duration-300 ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
              >
                Browse Jobs
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid md:grid-cols-3 gap-10 mb-28"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -15, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className={`rounded-3xl overflow-hidden border shadow-xl hover:shadow-2xl transition-all duration-500 ${darkMode ? 'bg-black border-gray-800 hover:border-white' : 'bg-white border-gray-200 hover:border-black'}`}>
              <motion.img
                src={feature.image}
                alt={feature.title}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="p-10">
                <motion.div
                  className="mb-6 inline-block p-4 rounded-2xl bg-gray-100 dark:bg-gray-900"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`p-20 rounded-3xl text-center border shadow-2xl ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}
      >
        <h2 className="text-5xl font-extrabold mb-6">Ready to start your job search?</h2>
        <p className={`text-2xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Join thousands of job seekers who have found their dream jobs with JobPortal AI.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400 }}>
          <Link
            to="/signup"
            className="inline-block px-12 py-5 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300"
          >
            Create Account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home
