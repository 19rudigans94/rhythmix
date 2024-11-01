import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { tokenService } from '@/shared/lib/cookies'

export function useAuthGuard(requireAuth = true) {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    const token = tokenService.getAccessToken()
    
    if (requireAuth && !token) {
      navigate('/login', { replace: true })
    } else if (!requireAuth && token) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate, requireAuth])

  return isAuthenticated
}