import React, { Component } from 'react';
class Loader extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="spinner-border" style={{position: "fixed", top: "50%",left: "50%",marginTop: "-100px", marginLeft: "-100px", fontSize: "10rem", zIndex: 9999, color: "var(--nav3)"}}></div>{' '}
      </div>
    );
  }
}

export default Loader;
