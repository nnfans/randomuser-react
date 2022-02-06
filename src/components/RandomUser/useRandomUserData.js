import { useCallback, useEffect, useReducer } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { parameterReducer, actionType } from './parameterReducer';

export const useRandomUserData = () => {
  const { data, fetch, status } = useFetch();
  const [parameter, dispatchParameter] = useReducer(parameterReducer, {
    results: 10,
    page: 1,
  });

  const reload = useCallback(() => {
    fetch({ params: parameter });
  }, [fetch, parameter]);

  useEffect(() => {
    reload();
  }, [reload]);

  const setGender = (gender) => {
    dispatchParameter({ type: actionType.SET_GENDER, gender });
  };

  const setKeyword = useCallback(
    (keyword) => {
      // is keyword different than current keyword
      // also check keyword property
      if (parameter.keyword !== keyword && (parameter.keyword || keyword)) {
        dispatchParameter({ type: actionType.SET_KEYWORD, keyword });
      }
    },
    [parameter.keyword]
  );

  const resetFilter = () => {
    dispatchParameter({ type: actionType.RESET_FILTER });
  };

  const setSort = useCallback(
    (sort) => {
      // is sort different than current keyword
      // also check keyword property
      if (parameter.sort !== sort && (parameter.sort || sort)) {
        dispatchParameter({ type: actionType.SET_SORT, sort });
      }
    },
    [parameter.sort]
  );

  const setPage = (page) => {
    dispatchParameter({ type: actionType.SET_PAGE, page });
  };

  return {
    data,
    reload,
    status,
    parameter,
    setGender,
    setKeyword,
    resetFilter,
    setSort,
    setPage,
  };
};
