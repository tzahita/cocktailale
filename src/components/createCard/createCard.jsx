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
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizIngredients: Joi.string().min(2).max(255).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri().allow(''),
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
        <PageHeader titleText="Business Registration Form" />
        <div className="row">
          <div className="col-12">
            <h5>Open business card</h5>
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
                {this.renderInput('bizName', 'Business Name')}
                {this.renderInput('bizIngredients', 'Ingredients Description')}
                {this.renderInput('bizDescription', 'Description')}
                {this.renderInput('bizAddress', 'Business Address')}
                {this.renderInput('bizPhone', 'Business Phone')}
                {this.renderInput('bizImage', 'Business Image')}
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
