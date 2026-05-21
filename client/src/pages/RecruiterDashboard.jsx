
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit, FiTrash2, FiUsers } from 'react-icons/fi'
import { API_BASE_URL } from '../utils/api'

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    type: 'full-time',
    requirements: '',
    skills: '',
  })
  const { token } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  useEffect(() => {
    fetchMyJobs()
  }, [])

  const fetchMyJobs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get(`${API_BASE_URL}/api/jobs/my-jobs`, config)
      setJobs(response.data.jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const jobData = {
        ...formData,
        requirements: formData.requirements.split(',').map((s) => s.trim()),
        skills: formData.skills.split(',').map((s) => s.trim()),
      }

      if (editingJob) {
        await axios.put(`${API_BASE_URL}/api/jobs/${editingJob._id}`, jobData, config)
      } else {
        await axios.post(`${API_BASE_URL}/api/jobs`, jobData, config)
      }

      setShowModal(false)
      setEditingJob(null)
      setFormData({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        type: 'full-time',
        requirements: '',
        skills: '',
      })
      fetchMyJobs()
    } catch (error) {
      console.error('Error saving job:', error)
    }
  }

  const handleEdit = (job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,
      requirements: job.requirements?.join(', ') || '',
      skills: job.skills?.join(', ') || '',
    })
    setShowModal(true)
  }

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        await axios.delete(`${API_BASE_URL}/api/jobs/${jobId}`, config)
        fetchMyJobs()
      } catch (error) {
        console.error('Error deleting job:', error)
      }
    }
  }

  const handleUpdateApplicationStatus = async (jobId, userId, status) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.put(
        `${API_BASE_URL}/api/jobs/application/update-status`,
        { jobId, userId, status },
        config
      )
      fetchMyJobs()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
          <button
            onClick={() => {
              setEditingJob(null)
              setFormData({
                title: '',
                description: '',
                company: '',
                location: '',
                salary: '',
                type: 'full-time',
                requirements: '',
                skills: '',
              })
              setShowModal(true)
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus className="mr-2" />
            Post Job
          </button>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{job.company}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FiUsers className="text-blue-600" />
                  <h3 className="font-bold">
                    Applicants ({job.applicants?.length || 0})
                  </h3>
                </div>
                {job.applicants?.length > 0 ? (
                  <div className="space-y-3">
                    {job.applicants.map((applicant) => (
                      <div
                        key={applicant.user._id}
                        className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{applicant.user.name}</p>
                            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {applicant.user.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              Applied: {new Date(applicant.appliedAt).toLocaleDateString()}
                            </p>
                            {applicant.user.resume && (
                              <a
                                href={applicant.user.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 text-sm"
                              >
                                View Resume
                              </a>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {applicant.status === 'pending' && (
                              <>
                                <button
                                  onClick={() =>
                                    handleUpdateApplicationStatus(
                                      job._id,
                                      applicant.user._id,
                                      'accepted'
                                    )
                                  }
                                  className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdateApplicationStatus(
                                      job._id,
                                      applicant.user._id,
                                      'rejected'
                                    )
                                  }
                                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {applicant.status === 'accepted' && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                Accepted
                              </span>
                            )}
                            {applicant.status === 'rejected' && (
                              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                Rejected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    No applicants yet
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`w-full max-w-2xl p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingJob ? 'Edit Job' : 'Post New Job'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 font-medium">Job Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 font-medium">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Salary</label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) =>
                        setFormData({ ...formData, salary: e.target.value })
                      }
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Job Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Requirements (comma-separated)
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({ ...formData, requirements: e.target.value })
                    }
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={6}
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingJob ? 'Update Job' : 'Post Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default RecruiterDashboard
