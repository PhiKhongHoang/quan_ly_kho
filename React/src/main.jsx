import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import './styles/global.css';
import ErrorPage from './pages/error.jsx';
import HomePage from './pages/home.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';
import CompanyPage from './pages/company.jsx';
import ContactPage from './pages/contact.jsx';
import AdminPage from './pages/admin.jsx';
import ImportGoodsPage from './pages/import_goods.jsx';
import ExportGoodsPage from './pages/export_goods.jsx';
import ForgotPassword from './pages/forgot_password.jsx';
import WelcomePage from './pages/welcome.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        // index: true,
        path: "/",
        element: (
          <PrivateRoute requireAuthOnly={true}>
            <HomePage />
          </PrivateRoute>
        ),
        children: [
          {
            // index: true,
            path: "/all-product",
          },
          {
            path: "/quan-tam",
          },
          {
            path: "/hang-sap-het",
          },
        ]
      },
      {
        path: "/welcome",
        element: (
          <PrivateRoute requireAuthOnly={true}>
            <WelcomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/goods/import-goods",
        element: (
          <PrivateRoute requiredModule="IMPORT_GOODS">
            <ImportGoodsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/goods/export-goods",
        element: (
          <PrivateRoute requiredModule="EXPORT_GOODS">
            <ExportGoodsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/company",
        element: (
          <PrivateRoute requiredModule="COMPANIES">
            <CompanyPage />
          </PrivateRoute>
        )
      },
      {
        path: "/contact",
        element:
          (<PrivateRoute requireAuthOnly={true}>
            <ContactPage />
          </PrivateRoute>
          )
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute
            requiredModule="USERS"
            requiredApiPath="/api/v1/users"
          >
            <AdminPage />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            path: "/admin/user",
          },
          {
            path: "/admin/role",
          },
          {
            path: "/admin/statistic",
            children: [
              {
                path: "/admin/statistic/product",
              },
              {
                path: "/admin/statistic/profit",
              },
              {
                path: "/admin/statistic/report_export",
              },
              {
                path: "/admin/statistic/report_import",
              },
            ]
          },
          {
            path: "/admin/product-manager",
            children: [
              {
                path: "/admin/product-manager/category",
              },
              {
                path: "/admin/product-manager/product",
              },
            ]
          },
        ]
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>,
)