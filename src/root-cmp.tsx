import { AppHeader } from './cmps/app-header';
import { RootRoute } from './routes';
import routes from './routes';
import { Routes, Route } from 'react-router-dom'

export default function RootCmp() {
  return (
    <div className="root-cmp">
      <AppHeader />
      <main>
        <Routes>
          {routes.map((route: RootRoute) => (
            <Route key={route.path} element={route.element} path={route.path} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

