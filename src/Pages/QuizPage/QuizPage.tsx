import React, { useState } from 'react';
import { fetchQuestions } from '../../http/userApi';
import { AnswerOptions } from '../../components/AnswerOptions/AnswerOptions';
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
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set(),
  );

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
    setAnsweredQuestions(prev => new Set(prev).add(questionId));
  };

  const startTest = async () => {
    setIsLoading(true);
    setError('');

    try {
      const questions = await fetchQuestions();
      setQuestions(questions);
      setIsTestStarted(true);
    } catch (err) {
      setError('Ошибка при получении вопросов. Пожалуйста, попробуйте позже.');
      console.error('Ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
    </div>
  );
};

export default QuizPage;
