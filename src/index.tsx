import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import RootCmp from './root-cmp';
import store from './store/store'
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/style.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
);