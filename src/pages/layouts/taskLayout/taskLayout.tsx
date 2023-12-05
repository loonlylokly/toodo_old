import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/header/header';

export function TaskLayout() {
  return (
    <>
      <Header title="My Task" />
      <Outlet />
    </>
  );
}
