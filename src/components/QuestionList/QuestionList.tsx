import React from 'react';

// Определение типа для вопроса
interface Question {
  id: number;
  text: string;
  right_ansv: string;
  wrong_answ1: string;
  wrong_answ2: string;
  wrong_answ3: string;
  category: string;
  difficulty: string;
  createdAt: string;
  updatedAt: string;
}

// Определение типа пропсов
interface QuestionsListProps {
  questions: Question[];
  onDelete: (id: number) => void; // Пропс для удаления вопроса
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  onDelete,
}) => {
  return (
    <div>
      <h1>Список вопросов</h1>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <h2>{question.text}</h2>
            <p>
              <strong>Правильный ответ:</strong> {question.right_ansv}
            </p>
            <p>
              <strong>Неправильные ответы:</strong>
            </p>
            <ul>
              <li>{question.wrong_answ1}</li>
              <li>{question.wrong_answ2}</li>
              <li>{question.wrong_answ3}</li>
            </ul>
            <p>
              <strong>Категория:</strong> {question.category}
            </p>
            <p>
              <strong>Сложность:</strong> {question.difficulty}
            </p>
            <p>
              <strong>Создано:</strong>{' '}
              {new Date(question.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Обновлено:</strong>{' '}
              {new Date(question.updatedAt).toLocaleString()}
            </p>
            {/* Кнопка для удаления */}
            <button onClick={() => onDelete(question.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
