import React from 'react';
import Classes from './addCard.module.css';

const AddCard = () => {
  return (
    <React.Fragment>
        <div className={Classes.addCard}>
      <div className={Classes.addCardOverlay}>
          <div className=" mb-2">
            <img src={require('../../img/plus-5-512.png')} alt="Add" />
            {/* <img src={require('../../img/plus-5-512 (1).png')} alt="Add" /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddCard;
//sfc imc
