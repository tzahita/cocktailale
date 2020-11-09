import React from 'react';
import moment from 'moment';
import Form from '../common/form/form';
import PageHeader from '../common/pageHeader/pageHeader';
import cardService from '../services/cardService';
import userService from '../services/userService';
import Recommendation from '../recommendation/recommendation';
import { Link, Redirect } from 'react-router-dom';
import Loader from '../common/loader/loader';
import cardsService from '../services/cardService';
import { toast } from 'react-toastify';

class CardDisplay extends Form {
  state = {
    data: {
      bizName: '',
      bizDescription: '',
      bizAddress: '',
      bizPhone: '',
      bizIngredients: [],
      cards: [],
      bizImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      postedBy: '',
      postedAt: '',
      isApproved: true,
      isDeleted: false
    },
    RcomCard: [],
    liked: false,
    errors: {},
    loaded: false,
  };

  componentDidMount = async () => {
    this.getCardsData();
    this.getFavorites();
    this.getCardsRecommendData();
    this.setState({ loaded: true });
  };
  updatePage = async (id) => {
    this.setState({ loaded: false });
    this.getCardsData(id);
    this.getFavorites();
    this.getCardsRecommendData(id);
    this.setState({ loaded: true });
  };

  getCardsData = async (id = this.props.match.params.id) => {
    const { data } = this.state;
    try {
      const card = await cardService.getCardById(id);
      data.bizName = card.data.bizName;
      data.bizIngredients = card.data.bizIngredients.split(',');
      data.bizDescription = card.data.bizDescription;
      data.bizAddress = card.data.bizAddress;
      data.bizPhone = card.data.bizPhone;
      data.bizImage = card.data.bizImage;
      data.postedBy = card.data.user;
      data.isApproved = card.data.isApproved;
      data.isDeleted = card.data.isDeleted;
      data.postedAt = moment(card.data.updatedAt).format('LLLL');
      this.setState({ data: data });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }
  };

  getCardsRecommendData = async (id = this.props.match.params.id) => {
    try {
      const { data } = await cardService.getCardsRecommend(id);
      this.setState({ RcomCard: data });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }
  };

  getFavorites = async () => {
    const { data } = this.state;
    try {
      const card = await userService.getFavorite();
      data.cards.push(card.data);
      this.setState({ data: data });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }
    this.setLiked();
  };

  toggleChange = (e) => {
    this.setState({ loaded: false });
    e.preventDefault();
    this.doSubmitFav();
  };

  doSubmitFav = async () => {
    let { data } = this.state;
    let updatedCards = await userService.setFavorite(this.props.match.params.id);
    data.cards[0] = updatedCards.data.cards;
    this.setState({ data: data });
    this.setLiked();
    this.setState({ loaded: true });
  };

  setLiked() {
    let { data } = this.state;
    const found = data.cards[0]?.find((element) => element === this.props.match.params.id);
    if (found) {
      this.setState({ liked: true });
    } else {
      this.setState({ liked: false });
    }
  }

  doDelete = async (e) => {
    e.preventDefault();
    let id = e.target.id
    let {data} = await cardsService.getCardById(id)
    delete data._id; 
    delete data.bizNumber; 
    delete data.user_id; 
    delete data.__v;
    delete data.user;
    data.isDeleted = true;
    await cardsService.editCard(data,id);
    data  = await cardsService.getPendingCards();
    this.setState({ cards: data });
    toast(`Campaign was declined`);
    this.props.history.replace('/manage');
  };

  doSubmit = async (e) => {
    e.preventDefault();
    let id = e.target.id
    let {data} = await cardsService.getCardById(id)
    delete data._id; 
    delete data.bizNumber; 
    delete data.user_id; 
    delete data.__v;
    delete data.user;
    data.isApproved = true;
    await cardsService.editCard(data,id);
    data  = await cardsService.getPendingCards();
    this.setState({ cards: data });
    toast(`Campaign was approved`);
    this.props.history.replace('/manage');
  };

  render() {
    const { data, RcomCard } = this.state;

    const mystyle = {
      height: '400px',
      width: '100%',
      backgroundImage: `url(${data.bizImage})`,
      backgroundColor: '#cccccc',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      boxShadow: '0 16px 38px -12px rgba(0, 0, 0, 0.56),0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    };
    return (
      <div className="container mb-4">
        {!this.state.loaded && <Loader />}
        <div className="row">
          <div className="col-md-9">
            <PageHeader titleText={data.bizName} />
          </div>
          <div className="col-md-3 text-right mt-5">
            {!this.props.user.ClAdmin && (
              <span onClick={this.toggleChange} className="faveLink">
                {!this.state.liked && <i class="far fa-heart"></i>}
                {this.state.liked && <i class="fas fa-heart"></i>}
                </span>
            )}
            {this.props.user.ClAdmin && (
              <div >
                {!this.state.data.isApproved && <button type="button" onClick={this.doSubmit} id={this.props.match.params.id} className="btn btn-success mr-3">
                  Approve
                </button>}
                <button type="button" onClick={this.doDelete} id={this.props.match.params.id} className="btn btn-danger">
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {data.postedBy && <h5 className="mt-0 text-muted">Posted By {data.postedBy}</h5>}
            {data.postedAt && <h5 className="mt-0 text-muted">{data.postedAt.toString().replace(/T/, ' ').replace(/\..+/, '')}</h5>}
          </div>
        </div>
        <div style={mystyle} className=" mt-3"></div>
        <div className="row ">
          <div className="col-md-12 mt-3">
            <form>
              <div className="row">
                <div className="col-md-3  ">
                  <h3>Ingredients</h3>
                  <div>
                    {data.bizIngredients.map((item) => (
                      <div className="list-group">
                        <li className="list-group-item list-group-item-action">{item}</li>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-1 "></div>
                <div className="col-md-8 ">
                  <h3>Description</h3>
                  <p className="list-group-item list-group-item-action">{data.bizDescription}</p>
                </div>
                <div className="m-3 col-md-12 row card-footer cardFooter_bgc">
                  <p className="col-2">
                    <b>Come visit us</b>
                  </p>
                  <p className="col-10">{data.bizAddress}</p>
                  <p className="col-2">
                    <b>Call us</b>
                  </p>
                  <p className="col-10">{data.bizPhone}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="container mt-5">
          <h2 className="text-center">Most Popular</h2>
          <div className="row">
            <div className="col-md-12">
              <div className="card-deck">
                {RcomCard.length > 0 &&
                  RcomCard.map((card) => (
                    <Link
                      to={`/card/display/${card._id}`}
                      className="col-md-3  mt-3 decor "
                      href="#top"
                      onClick={() => {
                        this.updatePage(card._id);
                      }}
                    >
                      <Recommendation key={card._id} title={card.bizName} imgS={card.bizImage}></Recommendation>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardDisplay;
