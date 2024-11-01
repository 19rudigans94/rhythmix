import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import { authAPI } from '@/features/auth/api/authApi'
import { i18n } from '@/shared/lib/i18n'
import { useAuthGuard } from '@/features/auth/lib/authGuard'

function Login() {
  useAuthGuard(false) // Redirect if already authenticated

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    
    try {
      const response = await authAPI.login(formData)
      dispatch(loginSuccess(response))
      navigate('/')
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || i18n.t('auth.loginError')))
    }
  }

  return (
    <div className="auth-container">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src="/logo-light.png" 
              alt="Rhythmix" 
              className="h-12 mx-auto animate-float"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {i18n.t('auth.welcomeBack')}
          </h1>
          <p className="text-gray-400">
            {i18n.t('auth.loginSubtitle')}
          </p>
        </div>
        
        <div className="card-wasabi">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 
                            p-4 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                {i18n.t('auth.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-wasabi w-full"
                required
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  {i18n.t('auth.password')}
                </label>
                <Link to="/forgot-password" className="text-sm text-wasabi-500 hover:text-wasabi-400">
                  {i18n.t('auth.forgotPassword')}
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-wasabi w-full"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-wasabi w-full flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="loading-wasabi w-5 h-5 mr-2"></div>
                  {i18n.t('auth.loggingIn')}
                </>
              ) : (
                i18n.t('auth.login')
              )}
            </button>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-rhythmix-gray text-gray-400">
                  {i18n.t('auth.or')}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                className="btn-wasabi-outline w-full flex items-center justify-center"
                onClick={() => {/* Handle OAuth */}}
              >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
                {i18n.t('auth.continueWithGoogle')}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-gray-400">
          {i18n.t('auth.noAccount')}{' '}
          <Link to="/register" className="text-wasabi-500 hover:text-wasabi-400">
            {i18n.t('auth.signUp')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login