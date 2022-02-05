import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';

import { useFetch, BASE_URL_API, statusType } from './useFetch';

jest.mock('axios');

describe('useFetch custom hook', () => {
  it('throw an error when url is empty', async () => {
    expect(useFetch).toThrowError(new Error("URL can't be empty"));
  });

  it('initial status is IDLE', async () => {
    const { result } = renderHook(() => useFetch({ url: '/' }));

    expect(result.current.status).toBe(statusType.IDLE);
  });

  describe('fetch()', () => {
    it('data is equal to axios resolved value', async () => {
      const { result } = renderHook(() => useFetch({ url: '/' }));

      axios.request.mockResolvedValue('data');

      await act(async () => {
        await result.current.fetch();
      });

      expect(result.current.data).toBe('data');
    });

    it('status is PENDING then RESOLVED', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useFetch({ url: '/' })
      );

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
      const { result } = renderHook(() => useFetch({ url: '/' }));

      axios.request.mockImplementation(() => {
        throw new Error('Error');
      });

      await act(async () => {
        await result.current.fetch();
      });

      expect(result.current.status).toBe(statusType.REJECTED);
    });

    it('call axios.request with some default parameter', async () => {
      const { result } = renderHook(() => useFetch({ url: '/' }));

      await act(async () => {
        await result.current.fetch();
      });

      expect(axios.request).toHaveBeenCalledWith({
        baseURL: BASE_URL_API,
        method: 'GET',
        url: '/',
      });
    });

    it('call axios.request with correct parameter', async () => {
      const { result } = renderHook(() =>
        useFetch({ baseURL: 'baseURL', method: 'METHOD', url: '/' })
      );

      await act(result.current.fetch);

      expect(axios.request).toHaveBeenCalledWith({
        baseURL: 'baseURL',
        method: 'METHOD',
        url: '/',
      });
    });
  });
});
