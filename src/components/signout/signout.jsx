import React, { Component } from 'react';
import userService from '../services/userService';

class Signout extends Component {
  state = {};
  componentDidMount() {
    userService.logout();
    window.location = '/';
  }

  render() {
    return null;
  }
}

export default Signout;
