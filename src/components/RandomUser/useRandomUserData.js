import { useCallback, useEffect, useReducer } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { parameterReducer, actionType } from './parameterReducer';

export const useRandomUserData = () => {
  const { data, fetch, status } = useFetch();
  const [parameter, dispatchParameter] = useReducer(parameterReducer, {
    results: 20,
    page: 1,
  });

  const reload = useCallback(() => {
    fetch({ params: parameter });
  }, [fetch, parameter]);

  useEffect(reload, [reload]);

  const setGender = (gender) => {
    dispatchParameter({ type: actionType.SET_GENDER, gender });
  };

  const setKeyword = useCallback((keyword) => {
    dispatchParameter({ type: actionType.SET_KEYWORD, keyword });
  }, []);

  return { data, reload, status, parameter, setGender, setKeyword };
};
