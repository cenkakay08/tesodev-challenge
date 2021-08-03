import React from "react";
import { StyledSpan } from "../Style/StyledComponents";

const Pagination = ({
  entriesPerPage,
  totalEntries,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.length > 0 ? (
        <div>
          {pageNumbers.length > 1 ? (
            <span
              tabIndex={99}
              className="page-item"
              onClick={() => {
                if (currentPage - 1 !== 0) {
                  paginate(currentPage - 1);
                }
              }}
            >
              Previous
            </span>
          ) : null}

          {pageNumbers.length < 7
            ? pageNumbers.map((number, index) => (
                <StyledSpan
                  selectedPage={currentPage}
                  key={number}
                  tabIndex={index + 1}
                  onClick={() => paginate(number)}
                >
                  <span key={number} className="page-link">
                    {number}
                  </span>
                </StyledSpan>
              ))
            : pageNumbers.map((number, index) => {
                return index === 0 ||
                  index === pageNumbers.length - 1 ||
                  index + 1 === currentPage ||
                  index + 2 === currentPage ||
                  index === currentPage ||
                  index + 3 === currentPage ||
                  index - 1 === currentPage ? (
                  <StyledSpan
                    selectedPage={currentPage}
                    key={number}
                    tabIndex={index + 1}
                    onClick={() => paginate(number)}
                  >
                    <span className="page-link">{number}</span>
                  </StyledSpan>
                ) : (
                  <span key={number} className="DotPaginationItem">
                    .
                  </span>
                );
              })}
          {pageNumbers.length > 1 ? (
            <span
              className="page-item"
              tabIndex={98}
              onClick={() => {
                if (currentPage !== pageNumbers.slice(-1).pop()) {
                  paginate(currentPage + 1);
                }
              }}
            >
              Next
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
