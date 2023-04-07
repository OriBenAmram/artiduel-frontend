import { Routes, Route } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';

import { AppHeader } from './cmps/app-header';

import routes, { RootRoute } from './routes';

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
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={3}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
    </div>
  );
}

