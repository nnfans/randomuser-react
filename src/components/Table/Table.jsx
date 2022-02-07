import { useEffect } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { useSorts } from './useSorts';

const makeTableRenderHeaderCell =
  ({ sorts, toggleSort }) =>
  ({ name, label }) => {
    const sortIndex = sorts.findIndex((sort) => sort.name === name);
    const sortIconRender =
      sortIndex === -1 ? (
        <FaSort className="text-secondary" />
      ) : sorts[sortIndex].sort === 'asc' ? (
        <FaSortUp className="text-primary" />
      ) : (
        <FaSortDown className="text-primary" />
      );

    return (
      <th key={name}>
        <div className="d-flex d-flex justify-content-between">
          <span onClick={() => toggleSort(name)} style={{ cursor: 'pointer' }}>
            {label}
          </span>
          <span className="text-end">{sortIconRender}</span>
        </div>
      </th>
    );
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

const Table = (props) => {
  const { rows, columns, isLoading, onRequest, className } = props;
  const { sorts, toggleSort, parsedSort } = useSorts();

  useEffect(() => {
    if (typeof onRequest === 'function') {
      onRequest.call(null, { sort: parsedSort });
    }
  }, [onRequest, parsedSort]);

  return (
    <table className={'table table-striped ' + (className || '')}>
      <thead>
        <tr>{columns.map(makeTableRenderHeaderCell({ sorts, toggleSort }))}</tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr className="text-center">
            <td colSpan={columns.length}>
              <div
                className="spinner-border spinner-border-sm text-secondary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </td>
          </tr>
        )}
        {(rows || []).map(makeTableRenderRow(columns))}
      </tbody>
    </table>
  );
};

export default Table;
