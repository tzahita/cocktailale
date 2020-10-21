import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BackgroundVideo from '../common/backgroundVideo/backgroundVideo';
import userService from '../services/userService';

class Home extends Component {
  state = {};

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/feed" />;
    }
    return (
      <React.Fragment>
        <div className="">
          <div className="row">
            <div className="home-main col-md-12 col-sm-12">
              <BackgroundVideo></BackgroundVideo>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
