import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage.jsx'
import MapPage from './pages/Map/MapPage.jsx'
import { CssBaseline } from '@mui/material'
import Base from './base.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#12422C', // Verde oscuro
      contrastText: '#FFFFFF' // Blanco
    },
    secondary: {
      main: '#FFFFFF', // Blanco
      contrastText: '#12422C' // Verde oscuro
    },
  },
});



const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    element: <Base />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/map',
        element: <MapPage />
      }
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)