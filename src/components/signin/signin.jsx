import React, { Component } from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
import Form from '../common/form/form';
import Joi from 'joi-browser';
import userServices from '../services/userService';
import { Redirect } from 'react-router-dom';
import classes  from './Signin.module.css';
import Loader from '../common/loader/loader';

class Signin extends Form {
  state = {
    title: 'Sign In',
    data: {
      email: '',
      password: '',
    },
    errors: {},
    loaded: true,

  };
  schema = {
    email: Joi.string().min(6).max(255).required().email().label('Email'),
    password: Joi.string().min(6).max(1024).required().label('Password'),
  };

  doSubmit = async () => {
    this.setState({ loaded: false });

    const { email, password } = this.state.data;

    const { location } = this.props;
    try {
      await userServices.login(email, password);

      if (location.state && location.state.from) {
        window.location = location.state.from.pathname;
        return;
      }
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
        this.setState({ loaded: true });

      }
    }
  };

  render() {
    if (userServices.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div >
        {!this.state.loaded &&<Loader/>}
        <div className="container col-md-12 signin_box  ">
        <PageHeader titleText={this.state.title}></PageHeader>
        <div className="row">
          <div className="col-12 ">
            <h5>Sign in by email and password</h5>
          </div>
        </div>
          <form onSubmit={this.handelOnSubmit} className="pb-5">
            <div className="row justify-content-center pb-5">
              {this.renderInput('email', '', 'text', 'Email')}
              {this.renderInput('password', '', 'password', 'Password')}
            </div>
            {this.renderButton('Submit')}
          </form>
        </div>
        {/* <div className={classes.Signin_bgc}></div> */}
      </div>
    );
  }
}

export default Signin;
