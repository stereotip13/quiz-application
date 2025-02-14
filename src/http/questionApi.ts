import { $host } from '.';
import { AxiosResponse } from 'axios';

interface Question {
  id?: number;
  text: string;
  right_ansv: string;
  wrong_answ1: string;
  wrong_answ2: string;
  wrong_answ3: string;
  category: string;
  difficulty: string;
}

export const createQuestion = async ({
  text,
  right_ansv,
  wrong_answ1,
  wrong_answ2,
  wrong_answ3,
  category,
  difficulty,
}: Omit<Question, 'id'>): Promise<AxiosResponse> => {
  const response: AxiosResponse = await $host.post(
    'http://localhost:5001/questions/crquest',
    {
      text,
      right_ansv,
      wrong_answ1,
      wrong_answ2,
      wrong_answ3,
      category,
      difficulty,
    },
  );
  return response;
};

export const getQuestions = async (): Promise<Question[]> => {
  const token = sessionStorage.getItem('token');
  const response = await $host.get('/questions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
