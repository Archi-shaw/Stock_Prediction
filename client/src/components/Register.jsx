import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess(false)

    try {
      await axios.post('http://127.0.0.1:8000/api/v1/register/', {
        username,
        email,
        password
      })

      setSuccess(true)

      // optional: auto redirect after 2 sec
      setTimeout(() => navigate('/login'), 2000)

    } catch (error) {
      setErrors(error.response?.data || {})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md  bg-lime-950 backdrop-blur-xl border border-lime-950 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-semibold text-white text-center mb-2">
          Create Account 🚀
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Start predicting smarter with AI insights
        </p>

        <form onSubmit={handleRegistration} className="space-y-4">

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <p className="text-green-400 text-sm text-center">
              🎉 Registration successful! Redirecting to login...
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Creating...
              </>
            ) : (
              'Create Account'
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  )
}

export default Register