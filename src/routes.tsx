import { HomePage } from './pages/home-page';
import { Feed } from './pages/feed';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import { UserProfile } from './pages/user-profile';
import { Game } from './pages/game';

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
    },
    {
        path: '/profile/:userId',
        element: <UserProfile />,
    },
    {
        path: '/game/:roomId',
        element: <Game />,
    }
];

export default routes;
