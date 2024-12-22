import { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

const useDataLoader = <P = unknown, Data = unknown>(
  loadFunc: (params: P) => Promise<AxiosResponse<Data>>,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [res, setRes] = useState<AxiosResponse<Data> | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  const loadData = async (params?: P) => {
    setRes(undefined);
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await loadFunc(params as P);
      setRes(response);
    } catch (e) {
      setError(e as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { loadData, isLoading, res, error };
};

export default useDataLoader;
