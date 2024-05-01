import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <header>
        <h1>Header component</h1>
      </header>
      <Outlet />
      <footer>
        <h1>footer component</h1>
      </footer>
    </div>
  );
};

export default MainLayout;
