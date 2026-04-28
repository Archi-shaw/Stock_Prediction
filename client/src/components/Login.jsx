import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/token/',
        { username, password }
      )

      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)

      setIsLoggedIn(true)
      navigate('/dashboard')

    } catch (error) {
      setError('Invalid username or password', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md  bg-lime-950   backdrop-blur-xl border border-lime-950  rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-semibold text-white text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Login to access your dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-blue-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Signing in...
              </>
            ) : (
              'Login'
            )}
          </button>

        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  )
}

export default Login