import { NavLink } from 'react-router-dom';
import '../../../../src/index.css';
export const Header = () => {
  return (
    <div>
      <NavLink className="link" to="/">
        Главная
      </NavLink>
      <NavLink to="/admin">Админка</NavLink>
      <NavLink className="link" to="/quiz">
        Тестирование
      </NavLink>
      <NavLink className="link" to="/result">
        Результаты
      </NavLink>
    </div>
  );
};
