import { useContext } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg  from-slate-900 via-slate-800 to-slate-900">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <Link 
          to="/" 
          className="text-xl font-semibold text-white tracking-wide hover:text-blue-400 transition"
        >
          📊 Stock Predictor
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button 
                text="Dashboard" 
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                url="/dashboard" 
              />
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Button 
                text="Login" 
                class="border border-blue-600 text-blue-400 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg transition"
                url="/login" 
              />
              <Button 
                text="Register" 
                class="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition"
                url="/register" 
              />
            </>
          )}
        </div>

      </nav>
    </header>
  )
}

export default Header