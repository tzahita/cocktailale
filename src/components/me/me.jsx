import React from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
import Form from '../common/form/form';
import Joi from 'joi-browser';
import http from '../services/http';
import { apiUrl } from '../../config.json';
import { toast } from 'react-toastify';
import userServices from '../services/userService';
import { Redirect } from 'react-router-dom';

class Me extends Form {
  state = {
    title: 'My Information',
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
    biz: Joi.boolean().required(),
  };

  componentDidMount = async () => {
    const currentUser = userServices.getCurrentUser();
    const data = { ...this.state.data, biz: currentUser.biz };

    try {
      const user = await http.get(`${apiUrl}/users/me`, currentUser);
      data.name = user.data.name;
      data.email = user.data.email;
      data.password = '';
      this.setState({ data: data });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }
  };

  doSubmit = async () => {
    const currentUser = userServices.getCurrentUser();
    const data = { ...this.state.data, biz: currentUser.biz };

    try {
      await http.put(`${apiUrl}/users/${currentUser._id}`, data);
      toast('success');
      window.location ='/'

    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Email is taken' } });
      }
    }
  };

  render() {
    if (!userServices.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <PageHeader titleText={this.state.title}></PageHeader>
        <div className="row">
          <div className="col-12 ">
            <h5>Here is your account information.</h5>
          </div>
        </div>
        <form onSubmit={this.handelOnSubmit}>
          <div className="row justify-content-center p-5">
            {this.renderInput('name', 'User Name', 'text', '')}
            {this.renderInput('email', 'Email', 'text', '')}
            {this.renderInput('password', 'Password', 'password', '')}
          </div>
          {this.renderButton('Update')}
        </form>
      </div>
    );
  }
}

export default Me;