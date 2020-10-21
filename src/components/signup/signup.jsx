import React from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
import Form from '../common/form/form';
import Joi from 'joi-browser';
import http from '../services/http';
import { apiUrl } from '../../config.json';
import { toast } from 'react-toastify';
import userServices from '../services/userService';
import { Redirect } from 'react-router-dom';
import classes from './Signup.module.css'
import Loader from '../common/loader/loader';


class Signup extends Form {
  state = {
    title: 'Create Account',
    data: {
      name: '',
      email: '',
      password: '',
      biz: false,
    },
    errors: {},
    loaded: true,

  };
  schema = {
    name: Joi.string().min(2).max(255).required().label('Name'),
    email: Joi.string().min(6).max(255).required().email().label('Email'),
    password: Joi.string().min(6).max(1024).required().label('Password'),
    biz: Joi.boolean().label('Biz'),
  };

  doSubmit = async () => {
    this.setState({ loaded: false });

    const data = { ...this.state.data };

    try {
      await http.post(`${apiUrl}/users`, data);
      toast('success');
      await userServices.login(data.email, data.password);
      window.location = '/';
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Email is taken' } });
        this.setState({ loaded: true });
      }
    }
  };
  toggleChange = () => {
    const data = { ...this.state.data };
    data.biz = !this.state.isChecked;
    this.setState({
      data: data,
    });
  };

  render() {
    if (userServices.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div>
      {!this.state.loaded &&<Loader/>}

      <div className="container col-md-12">
        <PageHeader titleText={this.state.title}></PageHeader>
        <div className="row">
          <div className="col-12 ">
            <h5>You can open a new account! </h5>
          </div>
        </div>
        <form onSubmit={this.handelOnSubmit}>
          <div className="row justify-content-center">
            {this.renderInput('name', '', 'text', 'User Name')}
            {this.renderInput('email', '', 'text', 'Email')}
            {this.renderInput('password', '', 'password', 'Password')}
            {this.renderCheckBox('biz', 'Are you a business?', 'checkbox', )} 
          </div>
          {this.renderButton('Submit')}
        </form>
      </div>
      </div>
    );
  }
}

export default Signup;
