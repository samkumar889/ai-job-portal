
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs } from '../redux/slices/jobSlice'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiBriefcase } from 'react-icons/fi'

const JobListings = () => {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const { jobs, loading } = useSelector((state) => state.jobs)
  const { darkMode } = useSelector((state) => state.theme)

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getJobs(keyword))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-4xl font-bold mb-10 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Job Listings</h1>

        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-xl mb-10`}>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cream-500 text-xl" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or keywords..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                    darkMode
                      ? 'bg-onyx-700 border-onyx-600 text-cream-100 placeholder-onyx-400'
                      : 'bg-cream-50 border-cream-300 text-onyx-900 placeholder-onyx-500'
                  }`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn-cream px-8 py-4 text-onyx-900 font-semibold rounded-xl"
            >
              Search Jobs
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className={`text-xl ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>Loading jobs...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs?.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card-hover"
              >
                <Link
                  to={`/jobs/${job._id}`}
                  className={`block p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>{job.title}</h3>
                      <p className={darkMode ? 'text-onyx-400' : 'text-onyx-600'}>{job.company}</p>
                    </div>
                    <FiBriefcase className="text-3xl text-cream-500" />
                  </div>
                  <div className="flex items-center mb-6">
                    <FiMapPin className="mr-2 text-cream-500" />
                    <p className={darkMode ? 'text-onyx-300' : 'text-onyx-700'}>{job.location}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-2 bg-cream-100 text-cream-600 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                    <p className="font-bold text-2xl text-cream-600">{job.salary}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && jobs?.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-xl ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>No jobs found</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default JobListings
