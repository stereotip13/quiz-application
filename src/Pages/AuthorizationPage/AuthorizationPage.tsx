import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { createAttachedSignature /*getCertificate*/ } from 'crypto-pro';
import { Certificate } from '../../components/Certificate';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
//import { registration } from '../../http/userApi';

interface CertificateData {
  thumbprint: string;
  name: string;
  subjectName: string;
}

export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const { setUserName } = useAuth();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [signature, setSignature] = useState('');

  // Функция для обработки изменения сертификата
  // Принимает сертификат в виде строки или null
  const handleCertificateChange = (cert: string | null) => {
    // Устанавливает состояние сертификата, преобразуя строку в тип CertificateData или null
    setCertificate(cert as unknown as CertificateData | null);
  };

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
        let password = '';
        console.log('это парт', parts);
        parts.forEach((part: string) => {
          if (part.includes('СНИЛС=')) {
            snils = part.split('=')[1]; // Получение значения после "="
          }
        });
        parts.forEach((part: string) => {
          if (part.includes('ИНН=')) {
            password = part.split('=')[1]; // Получение значения после "="
          }
        });
        console.log('значение СНИЛС', snils);
        let otdel = '';
        parts.forEach((part: string) => {
          if (part.includes('OU=')) {
            otdel = part.split('=')[1]; // Получение значения после "="
          }
        });
        console.log('значение отдела', otdel);
        const name = certificate.name;

        console.log('Имя владельца серта:', name);
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
        // Сохраняем имя пользователя
        localStorage.setItem('userName', name);
        setUserName(name);

        axios.post('http://localhost:5001/auth/login', {
          otdel,
          rating,
          name,
          password,
          snils,
        });
      } catch (error) {
        console.error('Произошла ошибка при создании сет сигнатуре:', error);
        return;
      }
    } else {
      console.error('Сертификат равен null.'); // Обработка случая, когда сертификат равен null
      return;
    }
    navigate('/quiz', { replace: true });
  }
  return (
    <form onSubmit={createSignature}>
      <h1>АВТОРИЗАЦИЯ ДЛЯ НАЧАЛА ТЕСТА</h1>
      <Certificate onChange={handleCertificateChange} />
      <Button disabled={false} type="submit" />
    </form>
  );
};
