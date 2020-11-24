import React from 'react';
const EmptyState = ({title}) => {
  return (
    <div className="container text-center animate__animated animate__fadeIn">
      <div className="row">
        <div className="col-md-12 mt-5">
          <h2>There are no {title}!</h2>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
