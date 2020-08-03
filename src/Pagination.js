import React from 'react';

const Pagination = ({ pokesPerPage, totalPokes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokes / pokesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav id="pagenav" className="d-flex justify-content-center">
      <ul className='pagination'>
        <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
            </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link stretched-link' >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
            <a className="page-link" href="!#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
            </a>
        </li>
      </ul>
    </nav>
    
  );
};

export default Pagination;