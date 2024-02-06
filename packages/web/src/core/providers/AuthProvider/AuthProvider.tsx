import { PropsWithChildren, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProfileDTO, ProfileModel } from '@/modules/user/models/ProfileModel'

export interface AuthContext {
  isLoggedIn: boolean
  isLoading: boolean
  user: ProfileDTO | null
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
      return ProfileModel.getProfile().then((res) => res?.data)
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
