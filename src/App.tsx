import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import DesignerLoginPage from './pages/designer/designerlogin';
import CustomerLoginPage from './pages/consumer/customerlogin';
import RegisterPage from './pages/designer/designerregister';
import CustomerHomePage from './pages/consumer/customerhome';
import ExplorePage from './pages/consumer/explore';
import ProfilePage from './pages/consumer/profilepage';
import HirePage from './pages/consumer/hire';
import CreateJobPostPage from './pages/consumer/post';

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
  {
    path: '/hire',
    element: <HirePage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/postjob',
    element: <CreateJobPostPage />,
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
