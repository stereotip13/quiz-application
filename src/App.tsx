import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import {
  AdminPage,
  AuthorizationPage,
  QuizPage,
  ResultPage,
  HomePage,
} from './Pages/Index';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/PrivateRoute/PrivateRoute';
import { ADMIN_ROUTE, QUIZ_ROUTE, RESULT_ROUTE, ROOT_ROUTE } from './utils';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context';

const AppRoutes = () => {
  const { userName } = useAuth();

  return (
    <Routes>
      <Route path={ROOT_ROUTE} element={<Layout />}>
        <Route
          index
          element={userName ? <HomePage /> : <AuthorizationPage />}
        />
        <Route
          path={ADMIN_ROUTE}
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path={QUIZ_ROUTE}
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path={RESULT_ROUTE}
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
