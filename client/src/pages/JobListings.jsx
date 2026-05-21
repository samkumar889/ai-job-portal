
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
        <h1 className="text-3xl font-bold mb-8">Job Listings</h1>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or keywords..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl">Loading jobs...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs?.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/jobs/${job._id}`}
                  className={`block p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{job.company}</p>
                    </div>
                    <FiBriefcase className="text-2xl text-blue-600" />
                  </div>
                  <div className="flex items-center mb-4">
                    <FiMapPin className="mr-2 text-gray-400" />
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{job.location}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {job.type}
                    </span>
                    <p className="font-bold text-lg">{job.salary}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && jobs?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl">No jobs found</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default JobListings
