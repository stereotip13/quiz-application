import { NavLink } from 'react-router-dom';
import '../../../../src/index.css';
import { IconButton } from '@mui/material';
import { AccountCircleRounded, QuizRounded } from '@mui/icons-material';

export const Header = () => {
  return (
    <header>
      <NavLink className={'link'} to="/">
        Главная
      </NavLink>
      <NavLink className={'link'} to="/admin">
        Админка
      </NavLink>
      <NavLink to="/quiz">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="success"
        >
          <QuizRounded />
        </IconButton>
      </NavLink>
      <NavLink to="/result">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="success"
        >
          <AccountCircleRounded />
        </IconButton>
      </NavLink>
    </header>
  );
};
