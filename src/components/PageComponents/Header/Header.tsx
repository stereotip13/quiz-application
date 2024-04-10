import { NavLink } from 'react-router-dom';
import '../../../../src/index.css';


export const Header = () => {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active-link' : '';
  return (
    <nav className="header-link">
       <div className="logo" >
          <NavLink className={setActive} to="/" style={{color: 'white', marginLeft: "10px"}}>
            Главная
          </NavLink>
       </div>
       <div className="nav-links">
            <NavLink className={setActive} to="/quiz" style={{color: 'white'}}>
              Начать тестирование
            </NavLink>
            <NavLink className={setActive} to="/result" style={{color: 'white', marginLeft: "20px"}}>
              Результаты
            </NavLink>
            <NavLink className={setActive} to="/admin" style={{color: 'white', marginLeft: "20px", marginRight: "20px" }}>
              Панель управления
            </NavLink>
        </div>
    </nav>
  );
};
