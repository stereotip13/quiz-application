import { NavLink } from 'react-router-dom';
import '../../../../src/index.css';
export const Header = () => {
  return (
    <header>
      <NavLink className={'link'} to="/">
        Главная
      </NavLink>
      <NavLink className={'link'} to="/admin">
        Админка
      </NavLink>
      <NavLink className={'link'} to="/quiz">
        Тестирование
      </NavLink>
      <NavLink className={'link'} to="/result">
        Результаты
      </NavLink>
    </header>
  );
};
