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
import DesignerHomePage from './pages/designer/designerhome';
import FindJobsPage from './pages/designer/findjobs';
import ProfilePage2 from './pages/designer/profile';
import CreatePostPage from './pages/designer/createpost';
import ProfileCard from './pages/consumer/profilecard';
import ResetPasswordPage from './assets/common/resetpassword';
import ConsumerRegisterPage from './pages/consumer/consumerregister';
import CResetPasswordPage from './assets/common/cresetpassword';


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
    path: '/consumerregister',
    element: <ConsumerRegisterPage />,
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
  {
    path: '/designerhome',
    element: <DesignerHomePage />,
  },
  {
    path: '/findjobs',
    element: <FindJobsPage />,
  },
  {
    path: '/profiledes',
    element: <ProfilePage2 />,
  },
  {
    path: '/addpost',
    element: <CreatePostPage />,
  },
  {
    path: '/card',
    element: <ProfileCard />,
  },
   {
    path: '/aresetpassword/:token',
    element: <ResetPasswordPage />,
  },
   {
    path: '/consumerreset/:token',
    element: <CResetPasswordPage />,
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
