import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { createAttachedSignature } from 'crypto-pro';
//import Button from '@mui/material/Button';
export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/quiz', { replace: true });
  };
  const [message, setMessage] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [hashStatus, setHashStatus] = useState('Не вычислен');
  const [hashError, setHashError] = useState(null);
  const [signature, setSignature] = useState('');
  const [signatureStatus, setSignatureStatus] = useState('Не создана');
  const [signatureError, setSignatureError] = useState(null);
  async function createSignature(event) {
    event.preventDefault();

    setSignature('');
    setSignatureError(null);

    setHash('');
    setHashError(null);
    setHashStatus('Вычисляется...');

    setHashStatus('Не вычислен');
    setSignatureStatus('Создается...');

    try {
      setSignature(
        await createAttachedSignature(certificate.thumbprint, message),
      );
      console.log(signature);
      navigate('/quiz', { replace: true });
    } catch (error) {
      setSignatureError(error.message);
    }

    setSignatureStatus('Не создана');
  }
  return (
    <form onSubmit={createAttachedSignature}>
      <h1>АВТОРИЗАЦИЯ ДЛЯ НАЧАЛА ТЕСТА</h1>
      <Button disabled={false} type="submit" />

      {/* <Button fullWidth variant="contained" type="submit">
        Get Started
      </Button>  */}
    </form>
  );
};
