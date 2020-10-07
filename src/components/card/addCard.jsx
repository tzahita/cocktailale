import React from 'react';

const  AddCard  = ({classes}) => {
    return (
      <React.Fragment>
        <div className={classes}>
          <div className=" mb-2">
            <img src={require('../../img/plus-5-512.png')} alt="Add" />
            {/* <img src={require('../../img/plus-5-512 (1).png')} alt="Add" /> */}
          </div>
        </div>
      </React.Fragment>
    );
}
export default AddCard;
//sfc imc
