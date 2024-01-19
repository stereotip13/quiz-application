import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AdminPage } from '../src/Pages/Index';
import { AuthorizationPage } from '../src/Pages/Index';
import { QuizPage } from '../src/Pages/Index';
import { ResultPage } from '../src/Pages/Index';
import { Layout } from './components/Layout';

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
