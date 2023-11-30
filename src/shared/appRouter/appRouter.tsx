import { MainLayout } from 'pages/layouts/mainLayout/mainLayout';
import { TaskLayout } from 'pages/layouts/taskLayout/taskLayout';
import { TodolistLayout } from 'pages/layouts/todolistLayout/todolistLayout';
import MainPage from 'pages/mainPage/mainPage';
import { MainPageAsync } from 'pages/mainPage/mainPageAsync';
import { NotFoundPage } from 'pages/notFoundPage/NotFoundPage';
import TaskPage from 'pages/taskPage/taskPage';
import { TaskPageAsync } from 'pages/taskPage/taskPageAsync';
import {Suspense} from 'react';
import {Route, RouteProps, Routes} from "react-router-dom";
import { routerConfig } from 'shared/config/routerConfig';
import { AppRoutes, MyRouteProps } from 'types/route';

function passThroughRoutes(routes: Record<AppRoutes, MyRouteProps>): JSX.Element {
  return (<>
    {Object.values(routes).map((route) => (
      route.type === 'layout' ?
        <Route
          key={route.layoutPath}
          path={route.layoutPath}
          element={route.layout}
        >
          {passThroughRoutes(route.routes)}
        </Route>
      :
        <Route
          key={route.path}
          path={route.path}
          index={route.index}
          element={(
            route.suspense ? 
              <Suspense fallback={route.suspense}>{route.element}</Suspense> :
              route.element
          )}
        />
    ))}
  </>);
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        {/* <Route path="/" element={<TodolistLayout/>}> */}
          {/* <Route
            path="/"
            index
            element={
              <Suspense fallback={ <div>Loading...</div>}>
                <MainPageAsync />
              </Suspense>
            }
          /> */}
          {passThroughRoutes(routerConfig)}
        {/* </Route> */}
        {/* <Route path="/tasks" element={<TaskLayout/>}> */}
          {/* <Route
            path=":id"
            element={
              <Suspense fallback={ <div>Loading...</div>}>
                <TaskPageAsync />
              </Suspense>
            }
          /> */}
        {/* {passThroughRoutes(routerConfig.tasksLayout.routes)} */}
        {/* </Route> */}
        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;

{/* {passThroughRoutes(routerConfig)} */}