import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { LandingPage } from './core/pages/LandingPage'
import { AppLayout } from './core/components/AppLayout'
import { ConfigurationPage } from './core/pages/ConfigurationPage'
import { AuthProvider } from './core/providers/AuthProvider'
import { QueryClientProvider } from './core/providers/QueryClientProvider'
import { ProtectedRoute } from './core/components/ProtectedRoute'
import { ThemeProvider } from 'styled-components'
import { theme } from './core/theme/default'
import { ConfigurationGeneralView } from './modules/configurations/views/ConfigurationGeneralView'
import { ConfigurationIntegrationsView } from './modules/configurations/views/ConfigurationIntegrationsView'
import { DashboardPage } from './core/pages/DashboardPage'

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
