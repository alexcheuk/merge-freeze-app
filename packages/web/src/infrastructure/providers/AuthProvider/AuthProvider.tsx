import { PropsWithChildren, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../../domains/user/use-cases/get-profile'
import { Profile } from '../../../domains/user/entities/profile.entity'

export interface AuthContext {
  isLoggedIn: boolean
  isLoading: boolean
  user: Profile | null
}

const DEFAULT_STATE = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
}

export const AuthContext = createContext<AuthContext>(DEFAULT_STATE)

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const {
    data,
    error,
    isLoading: isFetchingProfile,
  } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => {
      return getProfile()
    },
  })

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !error && !!data,
        isLoading: isFetchingProfile,
        user: data || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
