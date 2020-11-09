import Card from '../card/card';
import EmptyState from '../emptyState/emptyState';
import React, { Component } from 'react';
import PageHeader from '../common/pageHeader/pageHeader';
import userServices from '../services/userService';
import cardsService from '../services/cardService';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../common/loader/loader';

class ReviewCards extends Card {
  state = {
    title: 'Cocktails',
    cards: [],
    data: {
      bizName: '',
      bizDescription: '',
      bizAddress: '',
      bizPhone: '',
      bizIngredients: '',
      bizImage:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    loaded: false,
  };

 

  async componentDidMount() {
    const { data } = await cardsService.getPendingCards();
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
      <div className="container mb-4">
        <PageHeader titleText={this.state.title}></PageHeader>
        <div className="row">
          <div className="col-12">
            <p>Waiting for review.</p>
          </div>
        </div>
        <div className="row mb-4">
              {!this.state.loaded && <Loader />}
              {cards.length > 0 &&
                cards.map((card) => (
                  <Link to={`/card/display/${card._id}`} className="col-md-8 col-lg-4 mt-3 decor " href="/">
                    <Card key={card._id} className="cardLink" status={card.isApproved} card={card} />
                  </Link>
                ))}
              {this.state.loaded && cards.length === 0 && <EmptyState title="cocktails"></EmptyState>}
            </div>
      </div>
    );
  }
}

export default ReviewCards;
