
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FiUpload, FiFileText } from 'react-icons/fi'
import { API_BASE_URL } from '../utils/api'

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setAnalysis(null)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/resume/analyze`,
        formData,
        config
      )

      setAnalysis(response.data.analysis)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze resume')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Resume Analyzer</h1>

        <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-4 font-medium">Upload your resume (PDF)</label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                  darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <FiUpload className="text-4xl mx-auto mb-4 text-blue-600" />
                  <p className="text-lg font-medium">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>PDF files only</p>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
        </div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Resume Analysis Results</h2>
              <div className="inline-block p-6 rounded-full bg-blue-100">
                <p className="text-4xl font-bold text-blue-600">{analysis.atsScore}</p>
                <p className="text-sm text-blue-600">ATS Score</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FiFileText className="mr-2" />
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Suggestions for Improvement</h3>
                <ul className="space-y-2">
                  {analysis.suggestions?.map((suggestion, index) => (
                    <li key={index} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-blue-600 mr-2">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Interview Questions</h3>
              <div className="space-y-4">
                {analysis.interviewQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ResumeAnalyzer
