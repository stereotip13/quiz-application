import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context';
// Определение типа для дочерних элементов компонента
interface PrivateRouteProps {
  children: ReactElement;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { userName } = useAuth();

  // Если не аутентифицирован, перенаправить на страницу входа
  if (!userName) {
    // Сохраните текущий маршрут для будущей переадресации
    // после успешного входа в систему, если это необходимо.
    return <Navigate to="/" replace />;
  }

  return children;
};
export const AdminRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = true; /* ваша логика для проверки аутентификации */

  // Если не аутентифицирован, перенаправить на страницу входа
  if (!isAuthenticated) {
    // Сохраните текущий маршрут для будущей переадресации
    // после успешного входа в систему, если это необходимо.
    return <Navigate to="/login" replace />;
  }

  return children;
};
