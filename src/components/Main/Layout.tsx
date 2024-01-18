import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <>
        <header>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/admin">Админка</NavLink>
          <NavLink to="/quiz">Тестирование</NavLink>
          <NavLink to="/result">Результаты</NavLink>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>© ReactRouter Tutorials 2024</footer>
      </>
    </div>
  );
};

export { Layout };
