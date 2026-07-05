
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { applyForJob } from '../redux/slices/jobSlice'
import { motion } from 'framer-motion'
import { FiMapPin, FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi'
import { API_BASE_URL } from '../utils/api'

const JobDetails = () => {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs/${id}`)
        setJob(response.data.job)
      } catch (error) {
        console.error('Error fetching job:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  const handleApply = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    setApplying(true)
    try {
      await dispatch(applyForJob(id)).unwrap()
      alert('Applied successfully!')
    } catch (error) {
      alert(error)
    } finally {
      setApplying(false)
    }
  }

  const hasApplied = job?.applicants?.some(
    (applicant) => applicant.user === user?.id
  )

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className={`text-xl text-center ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className={`text-xl text-center ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>Job not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-10 rounded-2xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-xl`}
      >
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>{job.title}</h1>
              <p className={`text-2xl font-medium text-cream-600 mb-4`}>{job.company}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-cream-500" />
                  <span className={darkMode ? 'text-onyx-300' : 'text-onyx-700'}>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <FiBriefcase className="mr-2 text-cream-500" />
                  <span className="px-4 py-1 bg-cream-100 text-cream-600 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-cream-500" />
                  <span className={darkMode ? 'text-onyx-300' : 'text-onyx-700'}>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <p className={`text-3xl font-bold text-cream-600 mt-4 md:mt-0`}>{job.salary}</p>
          </div>

          {hasApplied ? (
            <div className="flex items-center justify-center py-4 bg-green-100 text-green-700 rounded-xl">
              <FiCheckCircle className="mr-2 text-xl" />
              <span className="font-medium">You have already applied for this job</span>
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="btn-cream w-full px-8 py-4 text-onyx-900 font-semibold rounded-xl disabled:opacity-50"
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          )}
        </div>

        <div className="mb-10">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Job Description</h2>
          <p className={darkMode ? 'text-onyx-300' : 'text-onyx-700'} whitespace-pre-line>
            {job.description}
          </p>
        </div>

        {job.requirements?.length > 0 && (
          <div className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((req, index) => (
                <li
                  key={index}
                  className={`flex items-start ${darkMode ? 'text-onyx-300' : 'text-onyx-700'}`}
                >
                  <span className="text-cream-500 mr-2 text-xl">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.skills?.length > 0 && (
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Skills</h2>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-cream-100 text-cream-600 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default JobDetails
