import { useCallback, useEffect, useReducer } from 'react';
import { useFetch } from '../../hooks/useFetch';

const actionType = {
  SET_GENDER: 'SET_GENDER',
};

const parameterReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_GENDER: {
      if (!action.gender) {
        delete state.gender;
        return { ...state };
      }
      return { ...state, gender: action.gender };
    }
    case actionType.SET_KEYWORD: {
      if (!action.keyword) {
        delete state.keyword;
        return { ...state };
      }
      return { ...state, keyword: action.keyword };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const useRandomUserData = () => {
  const { data, fetch, status } = useFetch();
  const [parameter, dispatchParameter] = useReducer(parameterReducer, {
    results: 20,
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
