import { Outlet } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import { Spinner } from '@nextui-org/react'
import { useEffect } from 'react'

export const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!isLoading && !isLoggedIn) {
      window.location.replace('/auth/github')
    }
  }, [isLoading])

  const isProtected = !isLoading && isLoggedIn

  return isLoading ? <Spinner /> : <>{isProtected ? <Outlet /> : null}</>
}
