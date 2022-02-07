import { format } from 'date-fns';

import Table from '../Table/Table';
import PaginationBar from '../PaginationBar/PaginationBar';

const RandomUserTable = (props) => {
  const { data, isLoading, onRequest, page, setPage } = props;

  const columns = [
    {
      name: 'username',
      label: 'Username',
      field: ({ login: { username } }) => username,
    },
    {
      name: 'name',
      label: 'Name',
      field: ({ name: { title, first, last } }) => `${title}.${first} ${last}`,
    },
    { name: 'email', label: 'Email', field: 'email' },
    { name: 'gender', label: 'Gender', field: 'gender' },
    {
      name: 'registrationDate',
      label: 'Registration Date',
      field: ({ registered: { date } }) =>
        format(new Date(date), 'dd-MM-yyyy HH:mm'),
    },
  ];

  return (
    <div>
      <Table
        className={props.className}
        rows={data?.results}
        columns={columns}
        isLoading={isLoading}
        onRequest={onRequest}
      />
      <PaginationBar page={page} totalPage={10} setPage={setPage} />
    </div>
  );
};

export default RandomUserTable;
