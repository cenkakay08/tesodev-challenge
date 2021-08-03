import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  margin-right: 0.5vw;
  margin-left: 0.5vw;
  background: ${(props) =>
    props.tabIndex === props.selectedPage ? "#204080" : "#ffffff;"};
  border: 1px solid #484848;
  box-sizing: content-box;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  padding: 0.3vw;
  padding-left: 0.4vw;
  padding-right: 0.4vw;

  color: ${(props) =>
    props.tabIndex === props.selectedPage ? "#ffffff" : "#484848"};
`;

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
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
