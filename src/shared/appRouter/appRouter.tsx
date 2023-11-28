import { MainLayout } from 'pages/layouts/mainLayout/mainLayout';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from 'shared/config/routerConfig';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {Object.values(routerConfig).map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRouter;
