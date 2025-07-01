import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import DesignerLoginPage from './pages/designer/designerlogin';
import CustomerLoginPage from './pages/consumer/customerlogin';
import RegisterPage from './pages/designer/designerregister';
import CustomerHomePage from './pages/consumer/customerhome';
import ExplorePage from './pages/consumer/explore';

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
    path: '/customerhome',
    element: <CustomerHomePage />,
  },
    {
    path: '/explore',
    element: <ExplorePage />,
  },
]);

function App() {
  return (
    <ParallaxProvider>
      <RouterProvider router={router} />
    </ParallaxProvider>
  );
}

export default App;
