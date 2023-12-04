import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/header/header';

export function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
