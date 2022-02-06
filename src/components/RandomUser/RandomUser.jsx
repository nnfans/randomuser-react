import { useCallback, useEffect, useState } from 'react';
import { statusType } from '../../hooks/useFetch';

import Input from '../Input/Input';
import Select from '../Select/Select';
import RandomUserTable from './RandomUserTable';

import { useRandomUserData } from './useRandomUserData';

const genderItems = [
  { value: '', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const RandomUser = () => {
  const {
    data,
    parameter,
    setGender,
    setKeyword,
    status,
    resetFilter,
    setSort,
    setPage,
  } = useRandomUserData();
  const [keywordDebounce, setKeywordDebounce] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setKeyword(keywordDebounce);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [setKeyword, keywordDebounce]);

  const handleResetKeyword = () => {
    setKeywordDebounce('');
    resetFilter();
  };

  const handleOnRequest = useCallback(
    ({ sort }) => {
      setSort(sort);
    },
    [setSort]
  );

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-2 p-2">
        <Input
          label="Search"
          name="keyword"
          value={keywordDebounce}
          setValue={setKeywordDebounce}
        />
        <Select
          label="Gender"
          value={parameter?.gender || ''}
          items={genderItems}
          setValue={setGender}
        />
        <button
          type="button"
          className="btn btn-secondary align-self-end"
          onClick={handleResetKeyword}
        >
          Reset Filter
        </button>
      </div>
      <div className="p-2">
        <RandomUserTable
          onRequest={handleOnRequest}
          data={data}
          page={parameter.page}
          setPage={setPage}
          isLoading={status === statusType.PENDING}
        />
      </div>
    </div>
  );
};

export default RandomUser;
