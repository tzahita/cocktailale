import React from 'react';
const Recommendation = ({ title = 'title', imgS = '' }) => {
  return (
    <div className="cardLink">
      <h4 className="card-title "> {title}</h4>

      <div
        className="card "
        style={{ height: '200px', width: '100%', padding: '0', margin: '0' }}
      >
        <img
          className="card-img-top"
          style={{ height: '100%', width: '100%' }}
          src={imgS}
          alt={title}
        />
      </div>
    </div>
  );
};

export default Recommendation;
