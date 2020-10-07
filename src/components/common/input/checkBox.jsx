import React from 'react';


const checkBox = ({label, name, error, ...rest}) => {
  return (
    <div className="form-group col-sm-12 col-md-12">
      <input {...rest} id={name} name={name} className="col-sm-3 col-md-3"/>
      <label className="col-md-9  p-3" htmlFor={name}>{label}</label>
      {error && <span className="text-danger">{error}</span>}
      </div>
  );
};

export default checkBox;
