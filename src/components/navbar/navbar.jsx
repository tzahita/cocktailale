import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import userServices from './services/userService';

class Navbar extends Component {
  state = {
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg shadow">
        <Link to="/" className="navbar-brand p-2">
       
        {/* <p className=" align-bottom m-0">CoCkTaIl<img className=" align-top" src={require('../img/cocktail-512-logo.png')} width="30" height="30" alt="logo"></img>LaLe</p> */}
        <p className=" align-bottom m-0">CocktaiLale</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item  p-2">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {this.props.user && this.props.user.biz && (
              <React.Fragment>
                <li className="nav-item  p-2">
                  <NavLink to="/my-cards" className="nav-link" href="/">
                    My Cocktails
                  </NavLink>
                </li>
                {/* <li className="nav-item  p-2">
                  <NavLink to="/create-card" className="nav-link" href="/">
                    Create Card
                  </NavLink>
                </li> */}
              </React.Fragment>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {!this.props.user && (
              <React.Fragment>
                <li className="nav-item p-2">
                  <NavLink to="/getStarted" className="nav-link">
                  Get Started
                  </NavLink>
                </li>
                {/* <li className="nav-item p-2">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item p-2">
                  <NavLink to="/biz-signup" className="nav-link">
                    Business
                  </NavLink>
                </li> */}
              </React.Fragment>
            )}

            {this.props.user && (
              <React.Fragment>
                <li className="nav-item p-2">
                  <NavLink to="/me" className="nav-link">
                    {this.props.data.email}
                  </NavLink>
                </li>
                <li className="nav-item p-2">
                  <NavLink to="/signout" className="nav-link text-logout">
                    Sign Out
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
