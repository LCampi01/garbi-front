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
import {
  EmployeePage
} from './pages/Empleados/EmployeePage.jsx';
import {
  ReportDetailsPage
} from './pages/ReportDetails/ReportDetailsPage.jsx';
import {
  RouteDetailPage
} from './pages/Routes/Detail/RouteDetailPage.jsx';
import PerfilPage from './pages/Perfil/PerfilPage.jsx';
import {
  ErrorPage
} from './pages/404/404.jsx';
import {
  Box
} from '@mui/material';
import {
  StatsPage
} from './pages/Stats/StatsPage.jsx';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#12422C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#12422C',
    },
  },
});

const ErrorBoundaryWithHeader = () => (
  <Box>
    <ErrorPage />
    <BaseWithHeader
      logoOnly={true}
    />
  </Box>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate
      to='/ingresar'
    />,
  },
  {
    path: '*',
    element: <ErrorBoundaryWithHeader />
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
    element: (
      <AuthenticatedRoute>
        <BaseWithHeader />
      </AuthenticatedRoute>
    ),
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
        path: '/recorridos/:id',
        element: <RouteDetailPage />,
      },
      {
        path: '/estadisticas',
        element: <StatsPage />,
      },
      {
        path: '/reportes',
        element: <ReportPage />,
      },
      {
        path: '/reportes/:id',
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
      redirectLogo={false}
    />,
    children: [
      {
        path: 'nuevo-reporte',
        element: <CreateReportPage />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider
    theme={theme}
  >
    <CssBaseline />
    <RouterProvider
      router={router}
    />
  </ThemeProvider>
);
