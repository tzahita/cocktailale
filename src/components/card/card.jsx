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
              <div class="card-img-overlay">
                <h3 className="card-title rounded d-inline-block text-truncate col-md-12"> {card.bizName}</h3>
              </div>
              <div className="  card_desc col-md-12">
                <h5>Description: </h5>
                <div className=" d-inline-block fadeText col-md-12" style={{ width: '100%' }}>
                  {' '}
                  {card.bizDescription}
                </div>
              </div>
              <span className="text-center actionContainer col-md-12  row ">
              {edit && actions}
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
