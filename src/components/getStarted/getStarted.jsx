import React from 'react';
import Signin from '../signin/signin';
import Signup from '../signup/signup';
import Form from '../common/form/form';
import classes from './GetStarted.module.css';

class GetStarted extends Form {
  state = {
    showSignUp: false,
  };

  handelClickSign = () => {
    let show = this.state.showSignUp;
    show = !show;
    this.setState({ showSignUp: show });
  };
  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        <div className={classes.Signin_bgc}>
      <div className="container mt-5 seperator animate__animated animate__fadeIn ">
          <div className=" row ">
            <div className="col-md-5">
              {!this.state.showSignUp && <Signin location={this.props.location} />}
              {this.state.showSignUp && (
                <button className=" col-md-12 btn btn-primary prim align-center pr-5 pl-5 pt-2 pb-2 animate__animated animate__fadeIn animate__fadeInLeft " onClick={this.handelClickSign} style={{ height: '50px', marginTop: '40%' }}>
                  Sign in
                </button>
              )}
            </div>
            <div className="seperator col-md-3"></div>
            <div className="col-md-4">
              {!this.state.showSignUp && (
                <button className=" col-md-12 btn btn-primary prim align-center pr-5 pl-5 pt-2 pb-2 animate__animated animate__fadeIn animate__fadeInRight" onClick={this.handelClickSign} style={{ height: '50px', marginTop: '50%' }}>
                  Create Account
                </button>
              )}
              {this.state.showSignUp && <Signup location={this.props.location} />}
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default GetStarted;
