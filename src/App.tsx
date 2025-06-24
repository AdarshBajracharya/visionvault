import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DesignerLoginPage from './pages/designer/designerlogin';
import CustomerLoginPage from './pages/consumer/customerlogin';
import RegisterPage from './pages/designer/designerregister';
import DesignerHomePage from './pages/consumer/customerhome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DesignerLoginPage />,
  },
  {
    path: '/consumerlogin',
    element: <CustomerLoginPage />,
  },
  {
    path: '/designerregister',
    element: <RegisterPage />,
  },
  {
    path: '/designerhome',
    element: <DesignerHomePage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;