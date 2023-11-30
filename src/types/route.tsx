import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  TODO_LIST_LAYOUT = 'todoListLayout',
  TASKS_LAYOUT = 'tasksLayout',
  ERROR = 'error',
};

export enum TODO_LIST_LAYOUT {
  MAIN = 'main',
}

export enum TASKS_LAYOUT {
  TASK = 'task',
}

type Routes = AppRoutes | TODO_LIST_LAYOUT | TASKS_LAYOUT;

interface MyRoute {
  type: 'layout' | 'route',
  notFound?: React.ReactNode | null,
  suspense?: React.ReactNode | null,
};

interface Layout<T extends string | number | symbol> extends MyRoute {
  type: 'layout'| 'route',
  layout?: React.ReactNode | null,
  layoutPath?: string,
  routes?: Record<T, MyRoute & RouteProps>,
}

interface MyRouteWithLayout<T extends string | number | symbol> extends Layout<T> {
  type: 'layout'| 'route',
  layout: React.ReactNode | null,
  layoutPath: string,
  routes: Record<T, MyRoute & RouteProps>,
}

interface MyRouteWithOutLayout<T extends string | number | symbol> extends Layout<T> {
  type: 'layout'| 'route',
  layout?: never,
  layoutPath?: never,
  routes?: never,
}

type MyLayout = MyRouteWithLayout<string | number | symbol> | MyRouteWithOutLayout<string | number | symbol>

export type MyRouteProps = MyLayout &  MyRoute & RouteProps;