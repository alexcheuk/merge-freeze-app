import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { LandingPage } from './features/homepage/LandingPage'
import { AppLayout } from './infrastructure/components/AppLayout'
import { ConfigurationPage } from './features/configurations/pages/ConfigurationPage'
import { AuthProvider } from './infrastructure/providers/AuthProvider'
import { QueryClientProvider } from './infrastructure/providers/QueryClientProvider'
import { ProtectedRoute } from './infrastructure/components/ProtectedRoute'
import { ThemeProvider } from 'styled-components'
import { theme } from './infrastructure/theme/default'
import { ConfigurationGeneralView } from './features/configurations/views/ConfigurationGeneralView'
import { ConfigurationIntegrationsView } from './features/configurations/views/ConfigurationIntegrationsView'
import { DashboardPage } from './features/dashboard/pages/DashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: (
      <AppLayout>
        <ProtectedRoute />
      </AppLayout>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/manage',
        element: <ConfigurationPage />,
        children: [
          { path: '', element: <Navigate to='/manage/general' replace /> },
          { path: 'general', element: <ConfigurationGeneralView /> },
          { path: 'integrations', element: <ConfigurationIntegrationsView /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/manage' replace />,
  },
])

const App = () => {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
