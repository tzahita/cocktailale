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
  };

  componentDidMount = async () => {
    const currentUser = userService.getCurrentUser();
    let {title} = this.state;
    let {text} = this.state;

    try {
      const user = await http.get(`${apiUrl}/users/me`, currentUser);
      title = `Hello ${user.data.name}! `;
      text = `Here some cocktails for you:`;

      this.setState({ title: title, text: text ,loaded: true});
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }

    this.getCards();
  };

  filterGrid =async()=> {
    let {filter} = this.state;
    if(filter){
      filter = false
    }else{
      filter = true
    }
    this.setState({filter: filter})
    if(filter){
      const { data } = await cardsService.getFavoriteCards('fav',this.state.searched);
      this.setState({ cards: data });
      this.setState({ loaded: true });
    }else{
      const { data } = await cardsService.getFavoriteCards('all',this.state.searched);
      if (data.length > 0) {
        this.setState({ cards: data });
      }
  }
  }

  searchName = async (name) => {
    this.setState({searched: name})
    this.getCards()
  }

  getCards = async () =>{
    
    let {filter} = this.state;
    if(filter){
      const { data } = await cardsService.getFavoriteCards('fav',this.state.searched);
      this.setState({ cards: data });
    }else{
      const { data } = await cardsService.getFavoriteCards('all',this.state.searched);
      if (data.length > 0) {
        this.setState({ cards: data });
      }
  }
}

  render() {
    const { cards } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="ml-auto mb-4 col-md-8">
            <PageHeader titleText={this.state.title}></PageHeader>
            <div className="row">
              <div className="col-12">
                <h5>{this.state.text}</h5>
              </div>
            </div>

            <div className="row mb-4">
            {!this.state.loaded &&cards.length > 0 &&<Loader/>}
              {cards.length > 0 &&
                cards.map((card) => (
                  <Link
                    to={`/card/display/${card._id}`}
                    className="col-md-8 col-lg-4 mt-3 decor "
                    href="/"
                  >
                    <Card key={card._id} className="cardLink" card={card} />
                  </Link>
                ))}
                {cards.length === 0 && <EmptyState></EmptyState>}
            </div>
          </div>
          <div className="col-md-2">
            {this.renderSearchBar()}
            {this.renderFilters()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feed;
