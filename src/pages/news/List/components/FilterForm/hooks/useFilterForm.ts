import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useFilterForm = () => {
  const methods = useForm();
  const [, setSearchParams] = useSearchParams();

  const { watch, reset } = methods;

  useEffect(() => {
    const subscriptionForm = watch((values) =>
      setSearchParams(
        (prev) => {
          Object.entries(values).forEach((item) => {
            if (item[1]) {
              prev.set(item[0], item[1]);
            } else {
              prev.delete(item[0]);
            }
          });
          return prev;
        },
        { preventScrollReset: true, replace: true },
      ),
    );

    return () => subscriptionForm.unsubscribe();
  }, [watch, setSearchParams]);

  const onReset = () => {
    reset();
    setSearchParams({}, { preventScrollReset: true, replace: true });
  };

  return { methods, onReset };
};

export default useFilterForm;
