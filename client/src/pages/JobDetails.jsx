
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
        <p className="text-xl text-center">Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-xl text-center">Job not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
      >
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <p className="text-xl text-blue-600 mb-2">{job.company}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <FiBriefcase className="mr-2 text-gray-400" />
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <p className="text-2xl font-bold">{job.salary}</p>
          </div>

          {hasApplied ? (
            <div className="flex items-center justify-center py-4 bg-green-100 text-green-700 rounded-lg">
              <FiCheckCircle className="mr-2" />
              <span>You have already applied for this job</span>
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line>
            {job.description}
          </p>
        </div>

        {job.requirements?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li
                  key={index}
                  className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  <span className="text-blue-600 mr-2">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.skills?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
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
