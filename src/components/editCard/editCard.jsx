import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form/form';
import PageHeader from '../common/pageHeader/pageHeader';
import cardService from '../services/cardService';
import Card from '../card/card';
import { toast } from 'react-toastify';
import Loader from '../common/loader/loader';

class EditCard extends Form {
  state = {
    data: {
      bizName: '',
      bizDescription: '',
      bizAddress: '',
      bizPhone: '',
      bizIngredients: '',
      bizImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    errors: {},
    loaded: false,
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required().label('Name'),
    bizDescription: Joi.string().min(2).max(1024).required().label('Description'),
    bizAddress: Joi.string().min(2).max(400).required().label('Address'),
    bizIngredients: Joi.string().min(2).max(255).required().label('Ingredients'),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label('Phone'),
    bizImage: Joi.string().min(11).max(1024).uri().allow('').label('Image'),
  };

  componentDidMount = async () => {
    const { data } = this.state;
    var str = this.props.location.pathname;
    str = str.replace('/edit-card/', '');
    try {
      const card = await cardService.getCardById(str);
      data.bizName = card.data.bizName;
      data.bizIngredients = card.data.bizIngredients;
      data.bizDescription = card.data.bizDescription;
      data.bizAddress = card.data.bizAddress;
      data.bizPhone = card.data.bizPhone;
      data.bizImage = card.data.bizImage;

      this.setState({ data: data });
    } catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({ errors: { email: 'Unexpected Error' } });
      }
    }
    this.setState({ loaded: true });
  };

  doSubmit = async () => {
    this.setState({ loaded: false });

    const { data } = this.state;
    if (!data.bizImage) {
      delete data.bizImage;
    }
    data.isApproved = false;
    data.isDeleted = false;
    await cardService.editCard(data, this.props.match.params.id);
    toast(`${data.bizName} was updated`);
    this.props.history.replace('/my-cards');
  };

  render() {
    const data = this.state.data;

    return (
      <div className="container mb-4">
        <PageHeader titleText="Business Registration Form" />
        <div className="row">
          <div className="col-12">
            <h5>Open business card</h5>
          </div>
        </div>
        <div className="row ">
          {!this.state.loaded && <Loader />}
          <div className="col-md-7 ">
            <form onSubmit={this.handelOnSubmit} onBlur={this.updateCardDisplay} className="pb-5">
              <div className="row justify-content-center">
                {this.renderInput('bizName', 'Cocktail Name')}
                {this.renderInput('bizIngredients', 'Ingredients Description')}
                {this.renderInput('bizDescription', 'Description')}
                {this.renderInput('bizAddress', 'Business Address')}
                {this.renderInput('bizPhone', 'Business Phone')}
                {this.renderInput('bizImage', 'Image URL')}
              </div>
              <span className="col-md-6">{this.renderButton('Update Card')}</span>
            </form>
          </div>
          <div className="col-md-5 d-flex flex-row-reverse">{<Card Key={data._id} className="col-md-10 " card={data} />}</div>
        </div>
      </div>
    );
  }
}

export default EditCard;
