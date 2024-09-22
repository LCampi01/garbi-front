import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  CssBaseline
} from '@mui/material';
import {
  ThemeProvider, createTheme
} from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate, RouterProvider, createBrowserRouter
} from 'react-router-dom';
import Base from './common/base.jsx';
import BaseWithHeader from './common/baseWithHeader.jsx';
import AreaPage from './pages/Area/AreaPage.jsx';
import {
  CompanyPage 
} from './pages/Company/CompanyPage.jsx';
import {
  ContainerPage
} from './pages/Containers/ContainerPage.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import RecommendationsPage from './pages/Recomendaciones/RecommendationsPage.jsx';
import {
  RoutesPage 
} from './pages/Routes/RoutesPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import {
  ReportPage
} from './pages/Report/ReportPage.jsx';
import {
  CreateReportPage
} from './pages/CreateReport/CreateReportPage.jsx';
import EmployeePage from './pages/Empleados/EmployeePage.jsx';
import {
  ReportDetailsPage
} from './pages/ReportDetails/ReportDetailsPage.jsx';
import {
  RouteDetailPage
} from './pages/Routes/Detail/RouteDetailPage.jsx';
import PerfilPage from './pages/Perfil/PerfilPage.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#12422C', // Verde oscuro
      contrastText: '#FFFFFF', // Blanco
    },
    secondary: {
      main: '#FFFFFF', // Blanco
      contrastText: '#12422C', // Verde oscuro
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate
      to='/ingresar'
    />,
  },
  {
    element: <Base />,
    children: [
      {
        path: '/ingresar',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <BaseWithHeader />,
    children: [
      {
        path: '/contenedores',
        element: <ContainerPage />,
      },
      {
        path: '/inicio',
        element: <HomePage />,
      },
      {
        path: '/empleados',
        element: <EmployeePage />,
      },
      {
        path: '/areas',
        element: <AreaPage />,
      },
      {
        path: '/recomendaciones',
        element: <RecommendationsPage />,
      },
      {
        path: '/recorridos',
        element: <RoutesPage />,
      },
      {
        path: '/recorridos/detalle',
        element: <RouteDetailPage />,
      },
      // {
      //   path: '/areas/nueva',
      //   element: <CreateAreaPage />,
      // },
      {
        path: '/reportes',
        element: <ReportPage />,
      },
      {
        path: '/reportes/detalle',
        element: <ReportDetailsPage />
      },
      {
        path: '/perfil',
        element: <PerfilPage />,
      },
    ],
  },
  {
    element: <BaseWithHeader
      logoOnly={true}
    />,
    children: [
      {
        path: '/empresas',
        element: <CompanyPage />,
      },
      {
        path: 'reportes/nuevo',
        element: <CreateReportPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <ThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <RouterProvider
        router={router}
      />
    </ThemeProvider>
  </React.Fragment>,
);
