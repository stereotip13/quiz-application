import React, { useState } from 'react';
import { fetchQuestions, sendTestResults } from '../../http/userApi';
import { AnswerOptions } from '../../components/AnswerOptions/AnswerOptions';
import { useNavigate } from 'react-router-dom';
import './QuizPage.css';

interface Question {
  id: number;
  text: string;
  right_ansv: string;
  wrong_answ1: string;
  wrong_answ2: string;
  wrong_answ3: string;
  category: string;
  difficulty: string;
}

interface UserAnswers {
  [questionId: number]: string;
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSendingResults, setIsSendingResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set(),
  );
  const navigate = useNavigate();

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
    setAnsweredQuestions(prev => new Set(prev).add(questionId));
  };

  const getRandomQuestions = (allQuestions: Question[], count: number) => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const startTest = async () => {
    setIsLoading(true);
    setError('');

    try {
      const allQuestions = await fetchQuestions();
      const randomQuestions = getRandomQuestions(allQuestions, 10);
      setQuestions(randomQuestions);
      setIsTestStarted(true);
    } catch (err) {
      setError('Ошибка при получении вопросов. Пожалуйста, попробуйте позже.');
      console.error('Ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateResults = () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((count, question) => {
      return userAnswers[question.id] === question.right_ansv
        ? count + 1
        : count;
    }, 0);
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return { correctAnswers, incorrectAnswers, percentage };
  };

  const handleFinishTest = async () => {
    setShowResults(true);
    setIsSendingResults(true);

    const results = calculateResults();
    const snils = localStorage.getItem('userSnils') || '';

    try {
      await sendTestResults({
        snils,
        user_results: results.percentage,
      });
      setTimeout(() => {
        navigate('/result');
      }, 5000); // Перенаправление через 5 секунд после показа результатов
    } catch (err) {
      setError('Ошибка при отправке результатов');
      console.error('Ошибка:', err);
    } finally {
      setIsSendingResults(false);
    }
  };

  const allQuestionsAnswered =
    questions.length > 0 && questions.every(q => userAnswers[q.id]);

  if (isLoading) {
    return <div className="loading">Загрузка вопросов...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!isTestStarted) {
    return (
      <div className="start-test-container">
        <h1>Тестирование</h1>
        <p>Нажмите кнопку ниже, чтобы начать тест</p>
        <button onClick={startTest} className="start-button">
          Начать тестирование
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Вопросы теста</h1>
      {questions.map(question => (
        <div key={question.id} className="question-card">
          <h2>{question.text}</h2>
          <AnswerOptions
            questionId={question.id}
            rightAnswer={question.right_ansv}
            wrongAnswers={[
              question.wrong_answ1,
              question.wrong_answ2,
              question.wrong_answ3,
            ]}
            selectedAnswer={userAnswers[question.id]}
            onAnswerSelect={handleAnswerSelect}
            showCorrectAnswer={answeredQuestions.has(question.id)}
          />
        </div>
      ))}

      {allQuestionsAnswered && !showResults && (
        <button
          onClick={handleFinishTest}
          className="finish-test-button"
          disabled={isSendingResults}
        >
          {isSendingResults ? 'Обработка результатов...' : 'Завершить тест'}
        </button>
      )}

      {showResults && (
        <div className="results-container">
          <h2>Результаты теста</h2>
          <div className="results-stats">
            <p>
              Правильных ответов:{' '}
              <span className="correct">
                {calculateResults().correctAnswers}
              </span>
            </p>
            <p>
              Неправильных ответов:{' '}
              <span className="incorrect">
                {calculateResults().incorrectAnswers}
              </span>
            </p>
            <p>
              Процент правильных ответов:{' '}
              <span className="percentage">
                {calculateResults().percentage}%
              </span>
            </p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <p className="redirect-message">
            Вы будете перенаправлены на страницу результатов через несколько
            секунд...
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
