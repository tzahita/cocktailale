import React, { Component } from 'react';

class Card extends Component {
  state = {};

  render() {
    const { card, className, edit, actions, status, deleted } = this.props;
    return (
      <React.Fragment>
        <div className={className}>
          <div className="card mb-2">
            <img src={card.bizImage} alt={card.bizName} className="p-2 card-img-left" />
            <div className="card-body row">
              <h3 className="card-title  d-inline-block text-truncate col-md-12"> {card.bizName}</h3>
              <div className=" borderd card_desc pt-2 col-md-12">
                <h5>Description: </h5>
                <div className=" pt-2 d-inline-block text-truncate  col-md-12" style={{ width: '100%' }}>
                  {' '}
                  {card.bizDescription}
                </div>
              </div>
              <div className=" col-md-6 mt-3 card_tel">
                <h5>Tel: </h5>
                {card.bizPhone}{' '}
              </div>

              <div className=" col-md-6 mt-3 d-inline-block text-truncate card_address">
                <h5>Address: </h5>
                {card.bizAddress}
              </div>
              {edit && actions}
              <span className="text-center col-md-12 pt-2 row ">
                <div className="col-md-3"></div>
                {edit && !status && !deleted && <h5 className="col-md-6 text-warning text-bold">PENDING</h5>}
                {edit && status && !deleted && <h5 className="col-md-6 text-success bold">ACTIVE</h5>}
                {edit && !status && deleted && <h5 className="col-md-6 text-danger bold">DECLINED</h5>}
                {edit && status && deleted && <h5 className="col-md-6 text-danger bold">ERROR</h5>}
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Card;
//sfc imc
