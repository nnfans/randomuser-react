import Table from '../Table/Table';

function RandomUserTable(props) {
  const { data, isLoading, onRequest } = props;

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
      field: ({ registered: { date } }) => date,
    },
  ];

  return (
    <Table
      className={props.className}
      rows={data?.results}
      columns={columns}
      isLoading={isLoading}
      onRequest={onRequest}
    />
  );
}

export default RandomUserTable;
