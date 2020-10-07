import React, { Component } from 'react';
import Input from '../input/input';
import SearchBar from '../input/searchBar';
import CheckBox from '../input/checkBox';
import Joi, { errors } from 'joi-browser';

class Form extends Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }
    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handelOnSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.doSubmit();
  };
  handelChangeSearch = ({ currentTarget: input }) => {
    // console.log(input.value)
    this.searchName(input.value)
  }
  
  handelChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    if(input.name === 'biz'){
      data[input.name] = !data[input.name];
    }else{
    data[input.name] = input.value;
    }
    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value,
    };
    const schema = {
      [name]: this.schema[name],
    };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  renderInput(name, label, type = 'text', placeholder = '', ...rest) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handelChange}
        error={errors[name]}
        placeholder={placeholder}
        {...rest}
      ></Input>
    );
  }
  renderCheckBox(name, label, type = 'text', placeholder = '', ...rest) {
    const { data, errors } = this.state;
    return (
      <CheckBox
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handelChange}
        error={errors[name]}
        placeholder={placeholder}
        {...rest}
      ></CheckBox>
    );
  }
  renderButton(title) {
    return (
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary prim align-center pr-5 pl-5 pt-2 pb-2 ">
          {title}
        </button>
      </div>
    );
  }
  renderSearchBar() {
    return (
      <SearchBar
      onChange={this.handelChangeSearch}
      ></SearchBar>
    );
  }

}

export default Form;
