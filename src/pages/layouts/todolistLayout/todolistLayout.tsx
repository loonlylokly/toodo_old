import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/header/header';

export function TodolistLayout() {
  return (
    <>
      <Header title="TooDo" />
      <Outlet />
    </>
  );
}
