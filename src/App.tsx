import { useEffect } from 'react';
import ConfigProvider from 'styles/ConfigProvider';
import { checkAuth } from 'reduxApp/authentification';
import { useAppDispatch } from 'hooks/customReduxHooks';
import { Router } from './routes';

const App = () => {
  const dispatch = useAppDispatch();

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
