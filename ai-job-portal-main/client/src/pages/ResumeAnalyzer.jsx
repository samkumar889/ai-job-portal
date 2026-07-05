
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
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold mb-10 text-center">Resume Analyzer</h1>

        <div className={`p-10 rounded-2xl border shadow-xl mb-10 ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block mb-5 font-semibold text-lg">Upload your resume (PDF)</label>
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  darkMode ? 'border-gray-700 hover:border-white' : 'border-gray-300 hover:border-black'
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
                  <FiUpload className="text-5xl mx-auto mb-5" />
                  <p className="text-xl font-semibold">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>PDF files only</p>
                </label>
              </div>
            </div>

            {error && (
              <div className={`mb-6 p-5 rounded-xl border ${darkMode ? 'bg-red-950 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
        </div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`p-10 rounded-2xl border shadow-xl ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-6">Resume Analysis Results</h2>
              <div className="inline-block p-8 rounded-full bg-gray-100 dark:bg-gray-900">
                <p className="text-6xl font-extrabold">{analysis.atsScore}</p>
                <p className="text-sm font-semibold mt-2">ATS Score</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold mb-5 flex items-center">
                  <FiFileText className="mr-3" />
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {analysis.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-5 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-5">Suggestions for Improvement</h3>
                <ul className="space-y-3">
                  {analysis.suggestions?.map((suggestion, index) => (
                    <li key={index} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="mr-3 font-bold">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6">Interview Questions</h3>
              <div className="space-y-4">
                {analysis.interviewQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
                  >
                    <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{question}</p>
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
