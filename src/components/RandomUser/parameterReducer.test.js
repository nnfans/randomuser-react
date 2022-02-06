import { actionType, parameterReducer } from './parameterReducer';

const oldState = {
  results: 20,
  gender: 'oldGender',
  keyword: 'oldKeyword',
};

Object.freeze(oldState);

describe('parameterReducer()', () => {
  it('should throw an error if action type is invalid', () => {
    expect(() => parameterReducer('state', { type: 'invalid' })).toThrowError(
      `Unhandled action type: invalid`
    );
  });

  describe('action.type SET_GENDER', () => {
    it('should set gender', () => {
      const state = parameterReducer(oldState, {
        type: actionType.SET_GENDER,
        gender: 'gender',
      });

      expect(oldState).not.toBe(state);

      expect(state).toStrictEqual({ ...state, gender: 'gender' });
    });

    it('should delete gender key as gender is falsy value', () => {
      const state = parameterReducer(oldState, {
        type: actionType.SET_GENDER,
        gender: '',
      });

      expect(oldState).not.toBe(state);

      const newState = Object.assign({}, oldState);
      delete newState.gender;

      expect(state).toStrictEqual(newState);
    });
  });

  describe('action.type SET_KEYWORD', () => {
    it('should set keyword', () => {
      const state = parameterReducer(oldState, {
        type: actionType.SET_KEYWORD,
        keyword: 'keyword',
      });

      expect(oldState).not.toBe(state);

      expect(state).toStrictEqual({ ...state, keyword: 'keyword' });
    });

    it('should delete keyword key as keyword is falsy value', () => {
      const state = parameterReducer(oldState, {
        type: actionType.SET_KEYWORD,
        keyword: '',
      });

      expect(oldState).not.toBe(state);

      const newState = Object.assign({}, oldState);
      delete newState.keyword;

      expect(state).toStrictEqual(newState);
    });
  });
});
