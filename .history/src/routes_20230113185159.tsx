import { HomePage } from './pages/home-page';
import { Feed } from './pages/feed';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';

export interface RootRoute {
    path: string
    element: JSX.Element
}

const routes: RootRoute[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/feed',
        element: <Feed />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    }
];

export default routes;
