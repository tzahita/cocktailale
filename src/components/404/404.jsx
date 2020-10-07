import React, { Component } from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
class About extends Component {
  state = {
    title: '404',
  };
  render() {
    return (
      <div className="container mb-4">
        <PageHeader titleText={this.state.title}></PageHeader>
        <div className="row">
          <div className="col-12">
            <h5>Here We Should Show Information About Us!</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 col-sm-12">
            
          </div>
          <div className="col-md-5 col-sm-12 pb-5">
            
          </div>
        </div>
      </div>
    );
  }
}

export default About;
