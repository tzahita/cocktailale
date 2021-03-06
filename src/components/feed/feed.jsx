import React from 'react';
import { Link } from 'react-router-dom';
import FilterPanel from '../filterPanel/filterPanel';
import PageHeader from '../common/pageHeader/pageHeader';
import Loader from '../common/loader/loader';
import Card from '../card/card';
import http from '../services/http';
import { apiUrl } from '../../config.json';
import userService from '../services/userService';
import cardsService from '../services/cardService';
import EmptyState from '../emptyState/emptyState';

class Feed extends FilterPanel {
  state = {
    title: '',
    text: '',
    cards: [],
    filter: false,
    searched: '',
    loaded: false,
    showEmptyState: false,
  };

  componentDidMount = async () => {
    const currentUser = userService.getCurrentUser();
    let { title } = this.state;
    let { text } = this.state;
    this.setState({ showEmptyState: false });

    try {
      const user = await http.get(`${apiUrl}/users/me`, currentUser);
      title = `Hello ${user.data.name}, `;
      text = `Here are a few cocktails for you.`;

      this.setState({ title: title, text: text, loaded: true });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }

    this.getCards();
    this.setState({ loaded: true });
  };

  filterGrid = async () => {
    this.setState({ loaded: false });

    let { filter } = this.state;
    if (filter) {
      filter = false;
    } else {
      filter = true;
    }
    this.setState({ filter: filter });
    if (filter) {
      const { data } = await cardsService.getFavoriteCards('fav', this.state.searched);
      this.setState({ cards: data });
    } else {
      const { data } = await cardsService.getFavoriteCards('all', this.state.searched);
      this.setState({ cards: data });
    }
    if (this.state.cards.length === 0) {
      this.setState({ showEmptyState: true });
    }
    this.setState({ loaded: true });
  };

  searchName = async (name) => {
    this.setState({ searched: name });
    this.setState({ loaded: false });
    this.getCards(name);

    this.setState({ loaded: true });
  };

  getCards = async (name = '') => {
    let { filter } = this.state;
    if (filter) {
      const { data } = await cardsService.getFavoriteCards('fav', name);
      this.setState({ cards: data });
    } else {
      const { data } = await cardsService.getFavoriteCards('all', name);
      this.setState({ cards: data });
    }
    if (this.state.cards.length === 0) {
      this.setState({ showEmptyState: true });
    }
  };

  render() {
    const { cards } = this.state;

    return (
      <React.Fragment>
        <div className="row  animate__animated animate__fadeIn ">
          <div className="ml-auto mb-4 col-md-8">
            <PageHeader titleText={this.state.title}></PageHeader>
            <div className="row">
              <div className="col-12">
                <h5>{this.state.text}</h5>
              </div>
            </div>
            <div className="row mb-4">
              {!this.state.loaded && <Loader />}
              {cards.length > 0 &&
                cards.map((card) => (
                  <Link to={`/card/display/${card._id}`} className="col-md-8 col-lg-3 mt-3 decor  " href="/">
                    <Card key={card._id} className="cardLink animate__animated animate__fadeIn " card={card} />
                    <div className="middle">
                      <div className="text">Open</div>
                    </div>
                  </Link>
                ))}
              {this.state.showEmptyState && cards.length === 0 && <EmptyState title="cocktails"></EmptyState>}
            </div>
          </div>
          <div className="col-md-2 mr-4 rounded animate__animated animate__fadeIn position-sticky">
            {this.renderSearchBar()}
            {this.renderFilters()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feed;
