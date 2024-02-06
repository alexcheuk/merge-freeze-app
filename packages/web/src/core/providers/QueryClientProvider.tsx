import { QueryClientProvider as Provider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { reactQueryClient } from '../libs/react-query/QueryClient'

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <Provider client={reactQueryClient}>{children}</Provider>
}
