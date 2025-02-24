import React, { useState, FormEvent, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { createQuestion } from '../../http/questionApi';
import QuestionsList from '../../components/QuestionList/QuestionList';

// Определяем тип для данных формы
interface FormData {
  text: string;
  right_ansv: string;
  wrong_answ1: string;
  wrong_answ2: string;
  wrong_answ3: string;
  category: string;
  difficulty: string;
}

// Определение типа для вопроса
interface Question extends FormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}
const AdminPage: React.FC = () => {
  // Состояние для списка вопросов
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Состояния для фильтрации
  const [filterCategory, setFilterCategory] = useState<string>(''); // Для фильтрации по категории
  const [filterDifficulty, setFilterDifficulty] = useState<string>(''); // Для фильтрации по сложности

  // Задаем начальные значения для состояния формы
  const [formData, setFormData] = useState<FormData>({
    text: '',
    right_ansv: '',
    wrong_answ1: '',
    wrong_answ2: '',
    wrong_answ3: '',
    category: 'orsibi',
    difficulty: 'легкий',
  });

  // Запрос списка вопросов при загрузке компонента
  useEffect(() => {
    axios
      .get('http://192.168.1.203:5001/questions')
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      });
  }, []);
  // Обновляем состояние при вводе данных в поля формы
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Обработчик отправки формы
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log('Отправка данных на бэкэнд:', formData);
    createQuestion(formData)
      .then(response => {
        console.log('Данные успешно отправлены на бэкэнд:', response.data);
        const newQuestion: Question = response.data; // Допустим, что сервер возвращает созданный вопрос
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]); // Добавляем новый вопрос в конец списка
        setFormData({
          text: '',
          right_ansv: '',
          wrong_answ1: '',
          wrong_answ2: '',
          wrong_answ3: '',
          category: 'orsibi',
          difficulty: 'легкий',
        });
        console.log('ответ сервера', response.data);
      })
      .catch(error => {
        console.error('Ошибка при отправке данных на бэкэнд:', error);
      });
  }
  // Функция для удаления вопроса
  function handleDelete(questionId: number) {
    axios
      .delete(`http://localhost:5001/questions/${questionId}`)
      .then(() => {
        console.log(`Вопрос с ID ${questionId} успешно удален`);
        // Удаляем вопрос из состояния
        setQuestions(prevQuestions =>
          prevQuestions.filter(question => question.id !== questionId),
        );
      })
      .catch(error => {
        console.error(`Ошибка при удалении вопроса с ID ${questionId}:`, error);
      });
  }
  // Фильтрация вопросов по категории и сложности
  const filteredQuestions = questions.filter(question => {
    return (
      (filterCategory === '' || question.category === filterCategory) &&
      (filterDifficulty === '' || question.difficulty === filterDifficulty)
    );
  });

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Вопрос"
            required
            className="width-100"
          />
          <input
            type="text"
            name="right_ansv"
            value={formData.right_ansv}
            onChange={handleChange}
            placeholder="Правильный ответ"
            required
          />
          <input
            type="text"
            name="wrong_answ1"
            value={formData.wrong_answ1}
            onChange={handleChange}
            placeholder="Неверный ответ 1"
            required
          />
          <input
            type="text"
            name="wrong_answ2"
            value={formData.wrong_answ2}
            onChange={handleChange}
            placeholder="Неверный ответ 2"
            required
          />
          <input
            type="text"
            name="wrong_answ3"
            value={formData.wrong_answ3}
            onChange={handleChange}
            placeholder="Неверный ответ 3"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="orsibi">Orsibi</option>
            <option value="master">Master</option>
            <option value="beginer">Beginer</option>
          </select>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="легкий">Легкий</option>
            <option value="средний">Средний</option>
            <option value="продвинутый">Продвинутый</option>
          </select>
        </div>

        <button type="submit">Сохранить</button>
      </form>

      <div className="filters">
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="">Все категории</option>
          <option value="orsibi">Orsibi</option>
          <option value="master">Master</option>
          <option value="beginer">Beginer</option>
        </select>

        <select
          value={filterDifficulty}
          onChange={e => setFilterDifficulty(e.target.value)}
        >
          <option value="">Все уровни сложности</option>
          <option value="легкий">Легкий</option>
          <option value="средний">Средний</option>
          <option value="продвинутый">Продвинутый</option>
        </select>
      </div>

      {loading && <div className="loading">Загрузка...</div>}
      {error && <div className="error">{error}</div>}

      <QuestionsList questions={filteredQuestions} onDelete={handleDelete} />
    </div>
  );
};

export default AdminPage;
