import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/index';
import './Header.css';

export const Header = () => {
  const { userName, setUserName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setUserName(null);
    navigate('/');
  };

  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active-link' : '';

  return (
    <nav className="header-link">
      <div className="logo">
        <NavLink to="/">Главная</NavLink>
      </div>
      <div className="nav-links">
        {/* Условный рендеринг: отображаем навигационные ссылки только если пользователь авторизован */}
        {userName ? (
          <>
            <NavLink className={setActive} to="/quiz">
              Начать тестирование
            </NavLink>
            <NavLink className={setActive} to="/result">
              Результаты
            </NavLink>
            <NavLink className={setActive} to="/admin">
              Панель управления
            </NavLink>
            <div className="user-info">
              <div className="user-name">👤 {userName}</div>
              <button onClick={handleLogout} className="logout-button">
                <span title="Выйти">🚪</span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
};
