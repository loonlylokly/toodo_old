import { RouteProps } from 'react-router-dom';
import MainPage from 'pages/mainPage/mainPage';
import TaskPage from 'pages/taskPage/taskPage';
import { MainPageAsync } from 'pages/mainPage/mainPageAsync';
import { TaskPageAsync } from 'pages/taskPage/taskPageAsync';
import { NotFoundPage } from 'pages/notFoundPage/NotFoundPage';

export enum AppRoutes {
  MAIN = 'main',
  TASKS = 'tasks',
  ERROR = '*',
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.TASKS]: '/tasks/:id',
  [AppRoutes.ERROR]: '*',
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    index: true,
    element: <MainPage />,
  },
  [AppRoutes.TASKS]: {
    path: RoutePath.tasks,
    element: <TaskPage />,
  },
  [AppRoutes.ERROR]: {
    path: RoutePath.tasks,
    element: <NotFoundPage />,
  }
};
