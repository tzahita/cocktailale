import Card from '../card/card';
import AddCard from '../card/addCard';
import React, { Component } from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
import userServices from '../services/userService';
import cardsService from '../services/cardService';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './mycards.module.css';
import Loader from '../common/loader/loader';


class Mycards extends Card {
  state = {
    title: 'My Cocktails',
    cards: [],
    addCard: {
      bizName: 'Cocktailale',
      bizDescription: 'Cocktailale',
      bizAddress: 'Israel',
      bizPhone: '05123456',
      bizImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    loaded: false,
  };
  
  doSubmit = async (e) =>{
    // e.preventDefault();
    await cardsService.deleteCard(e.target.id);
    const { data } = await cardsService.getMyCards();
      this.setState({ cards: data });
    toast(`Campaign was deleted`);
  };

  async componentDidMount() {
    const { data } = await cardsService.getMyCards();
    if (data.length > 0) {
      this.setState({ cards: data });
    }
    this.setState({ loaded: true });
  }

  render() {
    const { cards } = this.state;
    if (!userServices.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container mb-4 animate__animated animate__fadeIn ">
        <PageHeader titleText={this.state.title}></PageHeader>
        <div className="row">
          <div className="col-12">
            <h5>This is my cocktails</h5>
          </div>

        </div>
        <div className="row ">
        {!this.state.loaded && <Loader/>}
        <Link to="/create-card" className="nav-link cardLink decor col-md-3 mt-2 " href="/">
        <AddCard card={this.state.addCard} classes="addCard animate__animated animate__fadeIn" />
          {/* <Card card={this.state.addCard} classes="addCard  mt-2" /> */}
        </Link>
          {cards.length > 0 &&
            cards.map((card) => (
              <Card
              Key={card._id}
              className="cardLink col-md-3  mt-3 decor animate__animated animate__fadeIn"
              card={card}
              edit={true}
              link={`/edit-card/${card._id}`}
              actions = {
                <div className=" mt-3 pb-1 col-md-12 row">
                {console.log(card)}
                    <div className=" col-md-12 row ">
                      <span className=" col-md-3"></span>
                      <Link to={`/edit-card/${card._id}`} className="col-md-3 text-center animate__animated animate__fadeIn " href="/">
                        <i className="  fas fa-edit editorIcon "></i>
                      </Link>
                      <span className=" col-md-1"></span>
                      <i className="  text-center col-md-3 fas fa-trash-alt deleteIcon" id={card._id} onClick={this.doSubmit}></i>
                    </div>
                  </div>}
                  status={card.isApproved}
                  deleted= {card.isDeleted}
                />
 
            ))}
        </div>
      </div>
    );
  }
}

export default Mycards;
