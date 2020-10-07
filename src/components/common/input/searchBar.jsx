import React from 'react';

const SearchBar = ({ label, name, error, ...rest }) => {
  return (
    <div className="md-form mt-5 mr-3">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        {...rest} id={name} name={name} 
      />
    </div>
  );
};

export default SearchBar;
