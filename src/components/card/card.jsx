import React, { Component } from 'react';

class Card extends Component {
  state = {};

  
  render() {
    const { card, className, link, edit ,actions} = this.props;
    return (
      <React.Fragment>
        <div className={className}>
          <div className="card mb-2">
            <img
              src={card.bizImage}
              alt={card.bizName}
              className="p-2 card-img-left"
              />
            <div className="card-body row">
              <h3 className="card-title  d-inline-block text-truncate col-md-12"> {card.bizName}</h3>
              <div className=" borderd pt-2 col-md-12">
                <h5>Description: </h5>
                <div className=" pt-2 d-inline-block text-truncate  col-md-12"  style={{width: "100%"}}> {card.bizDescription}</div>
              </div>
              <div className=" col-md-6 mt-3"><h5>Tel: </h5>
              {card.bizPhone} </div>
              
              <div  className=" col-md-6 mt-3 d-inline-block text-truncate"><h5>Address: </h5>
              {card.bizAddress}</div>  
                {edit && actions}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Card;
//sfc imc
