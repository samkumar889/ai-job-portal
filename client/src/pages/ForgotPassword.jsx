
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useSelector((state) => state.theme);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        throw new Error('This feature is not available yet. Please create a new account or use your existing credentials.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(data.message);
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-10 rounded-2xl ${darkMode ? 'bg-onyx-800 border border-onyx-700' : 'bg-white border border-cream-200'} shadow-xl`}
      >
        <h2 className={`text-3xl font-bold mb-2 text-center ${darkMode ? 'text-cream-100' : 'text-onyx-900'}`}>
          Forgot Password?
        </h2>
        <p className={`text-center mb-8 ${darkMode ? 'text-onyx-300' : 'text-onyx-600'}`}>
          Enter your email and we'll send you a reset link
        </p>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-cream-100' : 'text-onyx-800'}`}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl border transition-all-smooth focus:outline-none focus:ring-2 focus:ring-cream-500 ${
                darkMode
                  ? 'bg-onyx-700 border-onyx-600 text-cream-100 placeholder-onyx-400'
                  : 'bg-cream-50 border-cream-300 text-onyx-900 placeholder-onyx-500'
              }`}
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-cream w-full px-8 py-3 text-onyx-900 font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-8 text-center">
          <Link to="/login" className="text-cream-500 hover:underline font-semibold">
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
