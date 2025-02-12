import { $host } from '.';

//здесь реализуется ф-ал регистрации, авторизации и проверки токена на валидность
import { AxiosResponse } from 'axios';

interface UserCredentials {
  snils: string;
  password: string;
  name: string;
  otdel: string;
  rating: number;
}

interface LoginCredentials {
  snils: string;
  password: string;
  name: string;
}

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

export const registration = async ({
  snils,
  password,
  name,
  otdel,
  rating,
}: UserCredentials): Promise<AxiosResponse> => {
  const response: AxiosResponse = await $host.post(
    'http://localhost:5001/auth/register',
    { snils, password, name, otdel, rating },
  );
  return response;
};

export const login = async ({
  snils,
  password,
  name,
}: LoginCredentials): Promise<AxiosResponse> => {
  const response: AxiosResponse = await $host.post(
    'http://localhost:5001/auth/login',
    { snils, password, name },
  );
  return response;
};

export const fetchQuestions = async (): Promise<Question[]> => {
  const token = sessionStorage.getItem('token');
  const response = await $host.get('http://localhost:5001/questions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
