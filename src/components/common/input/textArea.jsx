import React from 'react';

const Textarea = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group col-sm-12 col-md-12">
      <label htmlFor={name}>{label}</label>
      <textarea style={{resize: 'none'}} rows="6" {...rest} id={name} name={name} className="form-control textareaClass"></textarea>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Textarea;
