
import ReactDOM from 'react-dom/client';
import '../index.css';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext';
import App from './App';

import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider >
    </AuthProvider>
  </HashRouter>



);



