import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// Определение типа для дочерних элементов компонента
interface PrivateRouteProps {
    children: ReactElement;
  }
export const PrivateRoute : React.FC<PrivateRouteProps>= ({ children }) => {
  const location = useLocation();
  const isAuthenticated = false/* ваша логика для проверки аутентификации */;

  // Если не аутентифицирован, перенаправить на страницу входа
  if (!isAuthenticated) {
    // Сохраните текущий маршрут для будущей переадресации
    // после успешного входа в систему, если это необходимо.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
export const AdminRoute : React.FC<PrivateRouteProps>= ({ children }) => {
  const location = useLocation();
  const isAuthenticated = true/* ваша логика для проверки аутентификации */;

  // Если не аутентифицирован, перенаправить на страницу входа
  if (!isAuthenticated) {
    // Сохраните текущий маршрут для будущей переадресации
    // после успешного входа в систему, если это необходимо.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};