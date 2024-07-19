import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { createAttachedSignature, getCertificate } from 'crypto-pro';
import { Certificate } from '../../components/Certificate';
import axios from 'axios';
import { registration } from '../../http/userApi';
export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<any>(null);
  const [signature, setSignature] = useState('');

  async function createSignature(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = 'hello';
    if (certificate) {
      try {
        setSignature(
          await createAttachedSignature(certificate.thumbprint, message),
        );
        console.log('Это подпись:', { signature });
        // Разделение строки на части по запятой и пробелу
        const parts = certificate.subjectName.split(', ');
        let snils = '';
        parts.forEach(part => {
          if (part.includes('СНИЛС=')) {
            snils = part.split('=')[1]; // Получение значения после "="
          }
        });
        console.log('значение СНИЛС', snils);
        let otdel = '';
        parts.forEach(part => {
          if (part.includes('OU=')) {
            otdel = part.split('=')[1]; // Получение значения после "="
          }
        });
        console.log('значение отдела', otdel);
        let name = certificate.name;

        console.log('Имя владельца серта:', name);
        const password = '123qwe';
        const rating = 1;
        // registration({ otdel, rating, name, password, snils })
        //   .then(response => {
        //     console.log(
        //       'Данные по регистрации успешно отправлены на бэк',
        //       response.data,
        //     );
        //   })
        //   .catch(error => {
        //     console.error('ошибка при отправке данных', error);
        //   });
        axios.post('http://localhost:5001/auth/register', {
          otdel,
          rating,
          name,
          password,
          snils,
        });
        navigate('/quiz', { replace: true });
      } catch (error) {
        console.error('Произошла ошибка при создании сет сигнатуре:', error);
      }
    } else {
      console.error('Сертификат равен null.'); // Обработка случая, когда сертификат равен null
    }
  }
  return (
    <form onSubmit={createSignature}>
      <h1>АВТОРИЗАЦИЯ ДЛЯ НАЧАЛА ТЕСТА</h1>
      <Certificate onChange={setCertificate} />
      <Button disabled={false} type="submit" />
    </form>
  );
};
