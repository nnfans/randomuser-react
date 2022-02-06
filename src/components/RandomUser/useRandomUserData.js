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

  return { data, reload, status, parameter, setGender };
};
