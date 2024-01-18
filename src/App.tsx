import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AdminPage from './components/Pages/AdminPage';
import AuthorizationPage from './components/Pages/AuthorizationPage';
import QuizPage from './components/Pages/QuizPage';
import ResultPage from './components/Pages/ResultPage';
import { Layout } from './components/Main/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AuthorizationPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="*" element={<AuthorizationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
