
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
        <h1 className={`text-4xl font-bold mb-10 text-center ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Resume Analyzer</h1>

        <div className={`p-10 rounded-2xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-xl mb-10`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className={`block mb-4 font-medium text-lg ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>Upload your resume (PDF)</label>
              <div
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all-smooth ${
                  darkMode
                    ? 'border-onyx-600 hover:border-cream-500 hover:bg-onyx-700'
                    : 'border-cream-300 hover:border-cream-500 hover:bg-cream-50'
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
                  <FiUpload className="text-5xl mx-auto mb-4 text-cream-500" />
                  <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className={darkMode ? 'text-onyx-400' : 'text-onyx-500'}>PDF files only</p>
                </label>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className="btn-cream w-full px-8 py-4 text-onyx-900 font-semibold rounded-xl disabled:opacity-50"
            >
              {loading ? 'Analyzing Resume...' : 'Analyze Resume'}
            </button>
          </form>
        </div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-10 rounded-2xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-xl`}
          >
            <div className="text-center mb-10">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Resume Analysis Results</h2>
              <div className="inline-flex items-center justify-center p-8 rounded-full bg-cream-100">
                <p className="text-5xl font-bold text-cream-600">{analysis.atsScore}</p>
                <p className="text-lg text-cream-600 ml-2">ATS Score</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>
                  <FiFileText className="mr-2 text-cream-500" />
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {analysis.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-cream-100 text-cream-600 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>
                  Suggestions for Improvement
                </h3>
                <ul className="space-y-3">
                  {analysis.suggestions?.map((suggestion, index) => (
                    <li key={index} className={`flex items-start ${darkMode ? 'text-onyx-300' : 'text-onyx-700'}`}>
                      <span className="text-cream-500 mr-2 text-xl">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>Interview Questions</h3>
              <div className="space-y-4">
                {analysis.interviewQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl ${darkMode ? 'bg-onyx-700' : 'bg-cream-50'}`}
                  >
                    <p className={darkMode ? 'text-cream-100' : 'text-onyx-800'}>{question}</p>
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
