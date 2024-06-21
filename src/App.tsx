import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AdminPage } from '../src/Pages/Index';
import { AuthorizationPage } from '../src/Pages/Index';
import { QuizPage } from '../src/Pages/Index';
import { ResultPage } from '../src/Pages/Index';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/PrivateRoute/PrivateRoute';
import { ADMIN_ROUTE, QUIZ_ROUTE, RESULT_ROUTE, ROOT_ROUTE } from './utils';


function App() {
  return (
    <>
      <Routes>
        <Route path={ROOT_ROUTE} element={<Layout />}>
          <Route index element={<AuthorizationPage />} />
          <Route path={ADMIN_ROUTE} element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
            } />
          <Route path={QUIZ_ROUTE} element={
            //<PrivateRoute>
              <QuizPage />
            //</PrivateRoute>
            } />
          <Route path={RESULT_ROUTE} element={
            //<PrivateRoute>
              <ResultPage />
            //</PrivateRoute>
            } />
          <Route path="*" element={<AuthorizationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
