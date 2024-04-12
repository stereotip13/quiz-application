import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
//import Button from '@mui/material/Button';
export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/quiz', { replace: true });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>АВТОРИЗАЦИЯ ДЛЯ НАЧАЛА ТЕСТА</h1>
      <Button disabled={false} type="submit" />

      {/* <Button fullWidth variant="contained" type="submit">
        Get Started
      </Button>  */}
    </form>
  );
};
