import { useState } from 'react';

export const useSorts = () => {
  const [sorts, setSorts] = useState([]);

  const toggleSort = (columnName) => {
    const firstSort = sorts?.[0];

    if (firstSort?.name === columnName) {
      if (firstSort.sort === 'asc') {
        setSorts([{ name: columnName, sort: 'desc' }]);
      } else {
        setSorts([]);
      }
    } else {
      setSorts([{ name: columnName, sort: 'asc' }]);
    }
  };

  const parsedSort = sorts
    .map(({ name, sort }) => (sort === 'desc' ? '-' : '') + name)
    .join(',');

  return { sorts, toggleSort, parsedSort };
};
