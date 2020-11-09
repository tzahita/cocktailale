import Card from '../card/card';
import AddCard from '../card/addCard';
import React, { Component } from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
import userServices from '../services/userService';
import cardsService from '../services/cardService';
import { NavLink, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../common/loader/loader';
import Mycards from '../mycards/mycards';
import ReviewCards from '../reviewCards/reviewCards';

class Manage extends Card {
  state = {
    display: 'Users',
    loaded: false,
  };

  handelClickSign = (e) => {
    let { display } = this.state.display;
    display = e.target.text
    this.setState({ display: display });
  };

  render() {
    const { cards } = this.state;
    if (!userServices.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row">
        <div id="mySidenav" className="sidenav col-md-2">
          <NavLink to="users" onClick={this.handelClickSign} className="nav-link">
            Users
          </NavLink>
          <NavLink to="cards" onClick={this.handelClickSign} className="nav-link">
            Cards
          </NavLink>
        </div>
       {this.state.display === 'Cards' && <ReviewCards/>}
      </div>
    );
  }
}

export default Manage;
