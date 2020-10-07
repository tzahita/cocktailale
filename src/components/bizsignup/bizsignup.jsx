import React from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
import Form from '../common/form/form';
import Joi from 'joi-browser';
import http from '../services/http';
import { apiUrl } from '../../config.json';
import { toast } from 'react-toastify';
import userServices from '../services/userService';
import { Redirect } from 'react-router-dom';
import classes from './bizsignup.module.css'
class BizSignup extends Form {
  state = {
    title: 'Business - Sign Up',
    data: {
      name: '',
      email: '',
      password: '',
    },
    errors: {},
  };
  schema = {
    name: Joi.string().min(2).max(255).required().label('Name'),
    email: Joi.string().min(6).max(255).required().email().label('Email'),
    password: Joi.string().min(6).max(1024).required().label('Password'),
  };

  doSubmit = async () => {
    const data = { ...this.state.data, biz: true };
    try {
      await http.post(`${apiUrl}/users`, data);
      toast('success');
      await userServices.login(data.email, data.password);
      window.location = '/create-card';
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Email is taken' } });
      }
    }
  };

  render() {
    if (userServices.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="container">
          <PageHeader titleText={this.state.title}></PageHeader>
          <div className="row">
            <div className="col-12 ">
              <h5>You can open a new account! It's free don't be cheap!!!</h5>
            </div>
          </div>
          <form onSubmit={this.handelOnSubmit}>
            <div className="row justify-content-center p-5">
              {this.renderInput('name', '', 'text', 'Business Name')}
              {this.renderInput('email', '', 'text', 'Business Email')}
              {this.renderInput('password', '', 'password', 'Password')}
            </div>
            {this.renderButton('Submit')}
          </form>
        </div>
        <div className={classes.BizSignup_bgc}></div>
      </div>
    );
  }
}

export default BizSignup;
