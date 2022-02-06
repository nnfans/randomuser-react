import { renderHook, act } from '@testing-library/react-hooks';
import { useSorts } from './useSorts';

describe('useSort()', () => {
  describe('toggleSort()', () => {
    it('property sorts with column name should alternate between none, asc and desc', () => {
      const { result } = renderHook(() => useSorts());

      act(() => {
        result.current.toggleSort('first');
      });
      expect(result.current.sorts).toEqual([{ name: 'first', sort: 'asc' }]);
      act(() => {
        result.current.toggleSort('first');
      });
      expect(result.current.sorts).toEqual([{ name: 'first', sort: 'desc' }]);
      act(() => {
        result.current.toggleSort('first');
      });
      expect(result.current.sorts).toEqual([]);
    });
  });
});
