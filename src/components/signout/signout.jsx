import React, { Component } from 'react';
import userService from '../services/userService';
import Loader from '../common/loader/loader';


class Signout extends Component {
  state = {    loaded: false,
  };
  componentDidMount() {
    userService.logout();
    window.location = '/';
    this.setState({ loaded: true });
  }

  render() {
    return ( <div>{!this.state.loaded &&<Loader/>}</div> );
  }
}

export default Signout;
