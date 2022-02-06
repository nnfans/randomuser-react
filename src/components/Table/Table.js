const tableRenderHeaderCell = ({ name, label }) => {
  return <th key={name}>{label}</th>;
};

const makeTableRenderCell = (row, rowIndex, rows) => {
  return (column, columnIndex, columns) => {
    let value;
    if (typeof column.field === 'function') {
      value = column.field.call(null, row, { rowIndex, rows });
    } else {
      value = row[column.field];
    }

    const displayValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    return <td key={columnIndex}>{displayValue}</td>;
  };
};

const makeTableRenderRow = (columns) => {
  return (row, rowIndex, rows) => {
    return (
      <tr key={rowIndex}>
        {columns.map(makeTableRenderCell(row, rowIndex, rows))}
      </tr>
    );
  };
};

function Table(props) {
  const { rows, columns } = props;

  return (
    <table className={'table table-striped ' + props.className}>
      <thead>
        <tr>{columns.map(tableRenderHeaderCell)}</tr>
      </thead>
      <tbody>{(rows || []).map(makeTableRenderRow(columns))}</tbody>
    </table>
  );
}

export default Table;