import { NavLink } from 'react-router-dom';
import '../../../../src/index.css';
import { Box } from '@mui/material';


export const Header = () => {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active-link' : '';
  return (
    <div className="header-link">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 2, m: 2 }}>
          <NavLink className={setActive} to="/">
            Главная
          </NavLink>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, m: 2 ,'& a': {marginLeft:'15px'}}}>
          <NavLink className={setActive} to="/quiz">
            Начать тестирование
          </NavLink>
          <NavLink className={setActive} to="/result">
            Результаты
          </NavLink>
          <NavLink className={setActive} to="/admin">
            Панель управления
          </NavLink>
        </Box>
      </Box>
    </div>
  );
};
