const PaginationBar = (props) => {
  const { page, totalPage, setPage } = props;

  const handleSetPage = (page) => {
    if (page <= totalPage && page > 0) {
      if (typeof setPage === 'function') {
        setPage(page);
      }
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={'page-item ' + (!page || page < 2 ? 'disabled' : '')}>
          <button className="page-link" onClick={() => handleSetPage(page - 1)}>
            Previous
          </button>
        </li>
        {page > 3 && (
          <li className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        )}
        {page > 2 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handleSetPage(page - 2)}
            >
              {page - 2}
            </button>
          </li>
        )}
        {page > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handleSetPage(page - 1)}
            >
              {page - 1}
            </button>
          </li>
        )}
        <li className="page-item active">
          <button className="page-link">{page}</button>
        </li>
        {totalPage - page > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handleSetPage(page + 1)}
            >
              {page + 1}
            </button>
          </li>
        )}
        {totalPage - page > 2 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handleSetPage(page + 2)}
            >
              {page + 2}
            </button>
          </li>
        )}
        {totalPage - page > 3 && (
          <li className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        )}
        <li className="page-item">
          <button className="page-link" onClick={() => handleSetPage(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationBar;
