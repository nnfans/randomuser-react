import { useReducer } from 'react';
import axios from 'axios';

export const BASE_URL_API = 'https://randomuser.me/api/';

const actionType = {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
};

export const statusType = { ...actionType, IDLE: 'IDLE' };

const fetchReducer = (state, action) => {
  switch (action.type) {
    case actionType.PENDING: {
      return { status: statusType.PENDING, data: null, error: null };
    }
    case actionType.RESOLVED: {
      return { status: statusType.RESOLVED, data: action.data, error: null };
    }
    case actionType.REJECTED: {
      return { status: statusType.REJECTED, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const useFetch = ({
  baseURL = BASE_URL_API,
  method = 'GET',
  url = '',
} = {}) => {
  const [{ status, data }, dispatch] = useReducer(fetchReducer, {
    status: statusType.IDLE,
    data: null,
    error: null,
  });

  const fetch = async (axiosOptions) => {
    try {
      dispatch({ type: actionType.PENDING });
      const data = await axios.request({
        baseURL,
        method,
        url,
        ...axiosOptions,
      });

      dispatch({ type: actionType.RESOLVED, data });
    } catch (error) {
      dispatch({ type: actionType.REJECTED, error });
    }
  };

  return { status, data, fetch };
};
