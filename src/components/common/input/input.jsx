import React from 'react';


const Input = ({label, name, error, ...rest}) => {
  return (
    <div className="form-group col-sm-12 col-md-12">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control "></input>
      {error && <span className="text-danger">{error}</span>}
      </div>
  );
};

export default Input;
