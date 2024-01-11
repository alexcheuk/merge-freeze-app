import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { LandingPage } from './presentation/pages/LandingPage'
import { AppLayout } from './presentation/components/AppLayout'
import { ManagePage } from './presentation/pages/ManagePage'
import { AuthProvider } from './presentation/providers/AuthProvider'
import { QueryClientProvider } from './presentation/providers/QueryClient'
import { ProtectedRoute } from './presentation/components/ProtectedRoute'

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
