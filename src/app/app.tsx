import { MainLayout } from 'pages/layouts/mainLayout/mainLayout';
import { createRoutesFromElements,
          RouterProvider,
          createBrowserRouter,
          Route} from 'react-router-dom';
import { routerConfig } from 'shared/config/routerConfig';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {Object.values(routerConfig).map(({element, path}) => (
        <Route 
        key={path}
        path={path}
        element={element}
        />
        ))}
    </Route>
  )
);

export function App() {  
  return (
    <RouterProvider router={router} />
  )
}
