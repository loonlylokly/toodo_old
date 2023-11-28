import { Outlet } from 'react-router-dom';
import Footer from 'widgets/footer/footer';
import { Header } from 'widgets/header/header';

export function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
