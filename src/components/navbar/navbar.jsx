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
            {this.props.user && this.props.user.biz && !this.props.user.ClAdmin &&(
              <React.Fragment>
                <li className="nav-item  p-2">
                  <NavLink to="/my-cards" className="nav-link" href="/">
                    My Cocktails
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {this.props.user && this.props.user.biz && this.props.user.ClAdmin &&(
              <React.Fragment>
                <li className="nav-item  p-2">
                  <NavLink to="/manage/" className="nav-link" href="/">
                    Manage
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">

            {this.props.user && (
              <React.Fragment>
                <li className="nav-item p-2">
                  <NavLink to="/me" className="nav-link">
                    {this.props.data.name}
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
