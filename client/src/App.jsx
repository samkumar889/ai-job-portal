
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import JobListings from './pages/JobListings'
import JobDetails from './pages/JobDetails'
import RecruiterDashboard from './pages/RecruiterDashboard'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { darkMode } = useSelector((state) => state.theme)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark bg-onyx-900 text-cream-100' : 'bg-cream-50 text-onyx-900'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/resume-analyzer" element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          } />
          <Route path="/recruiter-dashboard" element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
