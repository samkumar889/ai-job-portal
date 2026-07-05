
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold mb-10">Job Listings</h1>

        <div className={`p-8 rounded-2xl border shadow-xl mb-10 ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or keywords..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className={`w-full pl-12 pr-5 py-4 rounded-xl border-2 focus:outline-none focus:scale-[1.01] transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 focus:border-white' : 'bg-gray-50 border-gray-300 focus:border-black'}`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold">Loading jobs...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs?.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link
                  to={`/jobs/${job._id}`}
                  className={`block p-8 rounded-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-black border-gray-800 hover:border-white' : 'bg-white border-gray-200 hover:border-black'}`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{job.company}</p>
                    </div>
                    <FiBriefcase className="text-3xl" />
                  </div>
                  <div className="flex items-center mb-5">
                    <FiMapPin className="mr-3 text-gray-500" />
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{job.location}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm font-semibold">
                      {job.type}
                    </span>
                    <p className="font-bold text-xl">{job.salary}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && jobs?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold">No jobs found</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default JobListings
