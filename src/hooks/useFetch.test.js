import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';

import { useFetch, BASE_URL_API, statusType } from './useFetch';

jest.mock('axios');

const axiosDefaultParameter = {
  baseURL: BASE_URL_API,
  method: 'GET',
  url: '',
};

describe('useFetch custom hook', () => {
  it('initial status is IDLE', async () => {
    const { result } = renderHook(() => useFetch());

    expect(result.current.status).toBe(statusType.IDLE);
  });

  describe('fetch()', () => {
    it('data is equal to axios resolved value', async () => {
      const { result } = renderHook(() => useFetch());

      axios.request.mockResolvedValue('data');

      await act(result.current.fetch);

      expect(result.current.data).toBe('data');
    });

    it('status is PENDING then RESOLVED', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useFetch());

      axios.request.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      );

      await act(async () => {
        const fetchPromise = result.current.fetch();
        await waitForNextUpdate();
        expect(result.current.status).toBe(statusType.PENDING);

        await fetchPromise;
        expect(result.current.status).toBe(statusType.RESOLVED);
      });
    });

    it('status is REJECTED as axios request error', async () => {
      const { result } = renderHook(() => useFetch());

      axios.request.mockImplementation(() => {
        throw new Error('Error');
      });

      await act(result.current.fetch);

      expect(result.current.status).toBe(statusType.REJECTED);
    });

    it('call axios.request with default parameter', async () => {
      const { result } = renderHook(() => useFetch());

      await act(result.current.fetch);

      expect(axios.request).toBeCalledWith(axiosDefaultParameter);
    });

    it('call axios.request with passed default parameter', async () => {
      const parameter = { baseURL: 'baseURL', method: 'METHOD', url: '/' };
      const { result } = renderHook(() => useFetch(parameter));

      await act(result.current.fetch);

      expect(axios.request).toHaveBeenCalledWith(parameter);
    });

    it('call axios.request with additional parameter from fetch()', async () => {
      const parameter = { baseURL: 'baseURL', method: 'METHOD' };
      const addedParams = { params: 'newParams' };
      const { result } = renderHook(() => useFetch(parameter));

      await act(() => result.current.fetch(addedParams));

      expect(axios.request).toHaveBeenCalledWith({
        ...axiosDefaultParameter,
        ...parameter,
        ...addedParams,
      });
    });
  });
});
