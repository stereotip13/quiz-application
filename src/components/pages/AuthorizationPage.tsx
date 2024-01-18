import React from 'react';
import { Button } from '../Button/index.ts';
const authorizationPage = () => {
  return (
    <div>
      <h1>Начать тестирование</h1>
      <div className="card">
        <Button disabled={false} />
      </div>
    </div>
  );
};

export default authorizationPage;
