import React, { useState, FormEvent } from 'react';

// Определяем тип для данных формы
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AdminPage: React.FC = () => {
  // Задаем начальные значения для состояния формы
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Обновляем состояние при вводе данных в поля формы
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Обработчик отправки формы
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Валидация данных формы (например, проверка совпадения паролей)
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    // Здесь должна быть логика отправки данных на бэкэнд
    console.log('Отправка данных на бэкэнд:', formData);
    // Вызываем API для отправки данных или используем библиотеку вроде axios
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="вопрос"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Правильный ответ"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="неверный ответ 1"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="неверный ответ 2"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="неверный ответ 3"
        required
      />
      <button type="submit">Сохранить</button>
    </form>
  );
}
export default AdminPage;