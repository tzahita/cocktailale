import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form/form';
import PageHeader from '../common/pageHeader/pageHeader';
import cardService from '../services/cardService';
import Card from '../card/card';
import { toast } from 'react-toastify';

class CreateCard extends Form {
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
      .regex(/^0[2-9]\d{7,8}$/).label('Phone'),
    bizImage: Joi.string().min(11).max(1024).uri().allow('').label('Image'),
  };

 

  doSubmit = async () => {
    const { data } = this.state;
    if (!data.bizImage) {
      delete data.bizImage;
    }
    await cardService.createCard(data);
    toast('A new card is opened');
    this.props.history.replace('/my-cards');
  };

  render() {
    const data = this.state.data;
    return (
      <div className="container mb-4">
        <PageHeader titleText="New Cocktails Form" />
        <div className="row">
          <div className="col-12">
            <h5>New posts will be published after admins approval.</h5>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-7 ">
            <form
              onSubmit={this.handelOnSubmit}
              onBlur={this.updateCardDisplay}
              className="pb-5"
            >
              <div className="row justify-content-center">
                {this.renderInput('bizName', 'Cocktail Name')}
                {this.renderInput('bizIngredients', 'Ingredients Description')}
                {this.renderInput('bizDescription', 'Description')}
                {this.renderInput('bizAddress', 'Business Address')}
                {this.renderInput('bizPhone', 'Business Phone')}
                {this.renderInput('bizImage', 'Image URL')}
              </div>
              {this.renderButton('Create Card')}
            </form>
          </div>
          <div className="col-md-5 d-flex flex-row-reverse">
            {
                <Card
                  Key={data._id}
                  className="col-md-10 "
                  card={data}
                />
              }
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
