import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { createAttachedSignature } from 'crypto-pro';
import { Certificate } from '../../components/Certificate';
export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState <string | null> (null);
  const [hashStatus, setHashStatus] = useState('Не вычислен');
  const [hashError, setHashError] = useState(null);
  const [signature, setSignature] = useState('');
  const [signatureStatus, setSignatureStatus] = useState('Не создана');
  const [signatureError, setSignatureError] = useState(null);

  //сделал хандл, а он с ошибкой работает Uncaught TypeError: Cannot read properties of undefined (reading 'value')
  const handleCertificateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCertificate(e.target.value);}

  async function createSignature(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = 'hello';


    setSignature('');
    setSignatureError(null);

    setHashError(null);
    setHashStatus('Вычисляется...');

    setHashStatus('Не вычислен');
    setSignatureStatus('Создается...');

    try {
      setSignature(
        await createAttachedSignature(certificate.thumbprint, message),
      );
      console.log({signature});
      navigate('/quiz', { replace: true });
    } catch (error) {
      setSignatureError(error.message);
      console.log(error.message)
    }

    setSignatureStatus('Не создана');
  }
  return (
    <form onSubmit={createSignature}>
      <h1>АВТОРИЗАЦИЯ ДЛЯ НАЧАЛА ТЕСТА</h1>
      <Certificate onChange={setCertificate}/>
      <Button disabled={false} type="submit" />
    </form>
  );
};
