import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { startup } from 'startup/index.ts';
import { store } from 'reduxApp/store.ts';
import App from './App.tsx';
import 'styles/scss/base.scss';

startup().then(() => {
  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
