import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import { authAPI } from '@/features/auth/api/authApi'
import { i18n } from '@/shared/lib/i18n'
import { useAuthGuard } from '@/features/auth/lib/authGuard'

function Register() {
  useAuthGuard(false) // Redirect if already authenticated

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [validationErrors, setValidationErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = i18n.t('auth.nameRequired')
    }
    
    if (!formData.email.trim()) {
      errors.email = i18n.t('auth.emailRequired')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = i18n.t('auth.emailInvalid')
    }
    
    if (!formData.password) {
      errors.password = i18n.t('auth.passwordRequired')
    } else if (formData.password.length < 8) {
      errors.password = i18n.t('auth.passwordTooShort')
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = i18n.t('auth.passwordsDoNotMatch')
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    dispatch(loginStart())
    
    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      dispatch(loginSuccess(response))
      navigate('/')
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || i18n.t('auth.registrationError')))
    }
  }

  const renderInput = (name, type = 'text', label) => (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`input-wasabi w-full ${
          validationErrors[name] ? 'border-red-500 focus:border-red-500' : ''
        }`}
        required
      />
      {validationErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{validationErrors[name]}</p>
      )}
    </div>
  )

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
            {i18n.t('auth.createAccount')}
          </h1>
          <p className="text-gray-400">
            {i18n.t('auth.registerSubtitle')}
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
            
            {renderInput('name', 'text', i18n.t('auth.name'))}
            {renderInput('email', 'email', i18n.t('auth.email'))}
            {renderInput('password', 'password', i18n.t('auth.password'))}
            {renderInput('confirmPassword', 'password', i18n.t('auth.confirmPassword'))}
            
            <button
              type="submit"
              disabled={loading}
              className="btn-wasabi w-full flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="loading-wasabi w-5 h-5 mr-2"></div>
                  {i18n.t('auth.registering')}
                </>
              ) : (
                i18n.t('auth.createAccount')
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
          {i18n.t('auth.haveAccount')}{' '}
          <Link to="/login" className="text-wasabi-500 hover:text-wasabi-400">
            {i18n.t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register