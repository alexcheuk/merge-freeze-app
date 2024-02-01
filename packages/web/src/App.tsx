import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { LandingPage } from './core/pages/LandingPage'
import { AppLayout } from './core/components/AppLayout'
import { ManagePage } from './core/pages/ManagePage'
import { AuthProvider } from './core/providers/AuthProvider'
import { QueryClientProvider } from './core/providers/QueryClientProvider'
import { ProtectedRoute } from './core/components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
    ],
  },
  {
    element: (
      <AppLayout>
        <ProtectedRoute />
      </AppLayout>
    ),
    children: [
      {
        path: '/manage',
        element: <ManagePage />,
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
