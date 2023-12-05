import { MainPageAsync } from 'pages/mainPage/mainPageAsync';
import { TaskPageAsync } from 'pages/taskPage/taskPageAsync';
import { NotFoundPage } from 'pages/notFoundPage/NotFoundPage';
import { TaskLayout } from 'pages/layouts/taskLayout/taskLayout';
import { TodolistLayout } from 'pages/layouts/todolistLayout/todolistLayout';
import {
  AppRoutes,
  MyRouteProps,
  TASKS_LAYOUT,
  TODO_LIST_LAYOUT,
} from 'types/route';

export const RoutePath: Record<
  AppRoutes | TODO_LIST_LAYOUT | TASKS_LAYOUT,
  string
> = {
  [AppRoutes.TODO_LIST_LAYOUT]: '/',
  [AppRoutes.TASKS_LAYOUT]: '/tasks',
  [AppRoutes.ERROR]: '*',
  [TODO_LIST_LAYOUT.MAIN]: '/',
  [TASKS_LAYOUT.TASK]: ':id',
};

export const routerConfig: Record<AppRoutes, MyRouteProps> = {
  [AppRoutes.TODO_LIST_LAYOUT]: {
    type: 'layout',
    layout: <TodolistLayout />,
    layoutPath: RoutePath.todoListLayout,
    routes: {
      [TODO_LIST_LAYOUT.MAIN]: {
        type: 'route',
        path: RoutePath.main,
        index: true,
        element: <MainPageAsync />,
        suspense: <div>Loading...</div>,
      },
    },
  },
  [AppRoutes.TASKS_LAYOUT]: {
    type: 'layout',
    layout: <TaskLayout />,
    layoutPath: RoutePath.tasksLayout,
    routes: {
      [TASKS_LAYOUT.TASK]: {
        type: 'route',
        path: RoutePath.task,
        element: <TaskPageAsync />,
        suspense: <div>Loading...</div>,
      },
    },
  },
  [AppRoutes.ERROR]: {
    type: 'route',
    path: RoutePath.error,
    element: <NotFoundPage />,
  },
};
