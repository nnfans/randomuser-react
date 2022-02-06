export const actionType = {
  SET_GENDER: 'SET_GENDER',
  SET_KEYWORD: 'SET_KEYWORD',
  SET_PAGE: 'SET_PAGE',
};

export const parameterReducer = (state, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case actionType.SET_GENDER: {
      if (!action.gender) {
        delete newState.gender;
        return newState;
      }
      return { ...state, gender: action.gender };
    }
    case actionType.SET_KEYWORD: {
      if (!action.keyword) {
        delete newState.keyword;
        return newState;
      }
      return { ...state, keyword: action.keyword };
    }
    case actionType.SET_PAGE: {
      return { ...state, page: action.page };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
