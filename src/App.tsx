import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfigProvider from 'styles/ConfigProvider';
import { checkAuth } from 'reduxApp/authentification';
import { Router } from './routes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  );
};

export default App;
