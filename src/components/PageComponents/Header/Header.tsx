import { NavLink } from 'react-router-dom';
import '../../../../src/index.css';
import { Box, IconButton } from '@mui/material';
import {
  AccountCircleRounded,
  AdminPanelSettings,
  QuizRounded,
} from '@mui/icons-material';

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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, m: 1 }}>
          <NavLink className={setActive} to="/quiz">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="success"
              sx={{ mr: 2 }}
            >
              <AdminPanelSettings />
            </IconButton>
          </NavLink>
          <NavLink className={setActive} to="/quiz">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="success"
              sx={{ mr: 2 }}
            >
              <QuizRounded />
            </IconButton>
          </NavLink>
          <NavLink className={setActive} to="/result">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="success"
              sx={{ mr: 2 }}
            >
              <AccountCircleRounded />
            </IconButton>
          </NavLink>
        </Box>
      </Box>
    </div>
  );
};
