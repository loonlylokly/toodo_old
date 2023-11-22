import { createRoutesFromElements, RouterProvider, Routes, Route, createBrowserRouter } from 'react-router-dom';
import { MainPage } from "pages/mainPage/mainPage";
import { MainLayout } from 'pages/layouts/mainLayout/mainLayout';
import { TaskPage } from 'pages/taskPage/taskPage';
import { NotFoundPage } from 'pages/notFoundPage/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<MainPage />} />
      <Route path="task" element={<TaskPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export function App() {  
  return (
    <RouterProvider router={router} />
  )
}

