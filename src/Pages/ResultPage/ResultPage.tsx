import React, { useEffect, useState } from 'react';
import { getUserResults } from '../../http/userApi';
import './ResultPage.css';

interface UserResult {
  id: number;
  user_results: number;
  timestamp: string;
  user: {
    name: string;
    otdel: string;
  };
}

interface JwtPayload {
  user: {
    role: string;
    snils: string;
  };
  iat: number;
  exp: number;
}

export const ResultPage = () => {
  const [results, setResults] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Токен не найден');
        }

        const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload;
        const snils = payload.user.snils;

        const userResults = await getUserResults(snils);
        setResults(userResults);
        console.log('userResults', userResults);
      } catch (err) {
        setError('Ошибка при загрузке результатов');
        console.error('Ошибка:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (isLoading) {
    return <div className="loading">Загрузка результатов...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="results-page">
      <h1>История результатов тестирования</h1>
      <div className="results-list">
        {results.map(result => (
          <div key={result.id} className="result-card">
            <div className="result-header">
              <h2>Результат: {result.user_results}%</h2>
              <span className="result-date">
                {new Date(result.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="user-info">
              <p>Сотрудник: {result.user.name}</p>
              <p>Отдел: {result.user.otdel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
