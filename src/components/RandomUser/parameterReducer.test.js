import { actionType, parameterReducer } from './parameterReducer';

const oldState = {
  results: 20,
  page: 1,
  gender: 'oldGender',
  keyword: 'oldKeyword',
};

Object.freeze(oldState);

const parameterReducerWithOldstate = (action) => {
  return parameterReducer(oldState, action);
};

describe('parameterReducer()', () => {
  it('should throw an error if action type is invalid', () => {
    expect(() => parameterReducer('state', { type: 'invalid' })).toThrowError(
      `Unhandled action type: invalid`
    );
  });

  describe('action.type SET_GENDER', () => {
    it('should set gender', () => {
      const state = parameterReducerWithOldstate({
        type: actionType.SET_GENDER,
        gender: 'gender',
      });

      expect(state).toStrictEqual({ ...state, gender: 'gender' });
    });

    it('should delete gender key as gender is falsy value', () => {
      const state = parameterReducerWithOldstate({
        type: actionType.SET_GENDER,
        gender: '',
      });

      const newState = Object.assign({}, oldState);
      delete newState.gender;

      expect(state).toStrictEqual(newState);
    });
  });

  describe('action.type SET_KEYWORD', () => {
    it('should set keyword', () => {
      const state = parameterReducerWithOldstate({
        type: actionType.SET_KEYWORD,
        keyword: 'keyword',
      });

      expect(state).toStrictEqual({ ...state, keyword: 'keyword' });
    });

    it('should delete keyword key as keyword is falsy value', () => {
      const state = parameterReducerWithOldstate({
        type: actionType.SET_KEYWORD,
        keyword: '',
      });

      const newState = Object.assign({}, oldState);
      delete newState.keyword;

      expect(state).toStrictEqual(newState);
    });
  });

  describe('action.type SET_PAGE', () => {
    it('should set page', () => {
      const page = 2;
      const state = parameterReducerWithOldstate({
        type: actionType.SET_PAGE,
        page,
      });

      expect(state).toStrictEqual({ ...state, page });
    });
  });

  describe('action.type RESET_FILTER', () => {
    it('should delete keyword and gender', () => {
      const state = parameterReducerWithOldstate({
        type: actionType.RESET_FILTER,
      });

      const newState = Object.assign({}, oldState);
      delete newState.keyword;
      delete newState.gender;

      expect(state).toStrictEqual({ ...newState });
    });
  });

  describe('action.type SET_SORT', () => {
    it('should set sort', () => {
      const state = parameterReducerWithOldstate({
        type: actionType.SET_SORT,
        sort: 'sort',
      });

      expect(state).toStrictEqual({ ...state, sort: 'sort' });
    });

    it('should delete sort key as sort is falsy value', () => {
      const state = parameterReducerWithOldstate({
        type: actionType.SET_SORT,
        sort: '',
      });

      const newState = Object.assign({}, oldState);
      delete newState.sort;

      expect(state).toStrictEqual(newState);
    });
  });
});
