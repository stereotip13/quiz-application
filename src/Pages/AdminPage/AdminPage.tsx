import React, { useState, FormEvent, useRef } from 'react';
import './styles.css';
import { createQuestion } from '../../http/questionApi';
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

const AdminPage: React.FC = () => {
  // Задаем начальные значения для состояния формы
  const [formData, setFormData] = useState<FormData>({
    text: '',
    right_ansv: '',
    wrong_answ1: '',
    wrong_answ2: '',
    wrong_answ3: '',
    category: '',
    difficulty: '',
  });

  // Обновляем состояние при вводе данных в поля формы
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Обработчик отправки формы
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log('Отправка данных на бэкэнд:', formData);
    //axios.post('http://localhost:5001/questions/crquest', formData)
    createQuestion(formData)
      .then(response => {
        console.log('Данные успешно отправлены на бэкэнд:', response.data);
        setFormData({
          text: '',
          right_ansv: '',
          wrong_answ1: '',
          wrong_answ2: '',
          wrong_answ3: '',
          category: '',
          difficulty: '',
        });
      })
      .catch(error => {
        console.error('Ошибка при отправке данных на бэкэнд:', error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        value={formData.text}
        onChange={handleChange}
        placeholder="вопрос"
        required
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
        placeholder="неверный ответ 1"
        required
      />
      <input
        type="text"
        name="wrong_answ2"
        value={formData.wrong_answ2}
        onChange={handleChange}
        placeholder="неверный ответ 2"
        required
      />
      <input
        type="text"
        name="wrong_answ3"
        value={formData.wrong_answ3}
        onChange={handleChange}
        placeholder="неверный ответ 3"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="категория"
        required
      />
      <input
        type="text"
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        placeholder="сложность"
        required
      />
      <button type="submit">Сохранить</button>
    </form>
  );
};
export default AdminPage;
