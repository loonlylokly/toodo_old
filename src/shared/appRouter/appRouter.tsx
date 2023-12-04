import { MainLayout } from 'pages/layouts/mainLayout/mainLayout';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from 'shared/config/routerConfig';
import { AppRoutes, MyRouteProps } from 'types/route';

function passThroughRoutes(
  routes: Record<AppRoutes, MyRouteProps>
): JSX.Element {
  return (
    <>
      {Object.values(routes).map((route) => {
        if (route.type === 'layout') {
          return (
            <Route
              key={route.layoutPath}
              path={route.layoutPath}
              element={route.layout}
            >
              {passThroughRoutes(route.routes)}
            </Route>
          );
        }
        return (
          <Route
            key={route.path}
            path={route.path}
            index={route.index}
            element={
              route.suspense ? (
                <Suspense fallback={route.suspense}>{route.element}</Suspense>
              ) : (
                route.element
              )
            }
          />
        );
      })}
    </>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {passThroughRoutes(routerConfig)}
      </Route>
    </Routes>
  );
}

export default AppRouter;
