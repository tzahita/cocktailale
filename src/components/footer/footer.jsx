import React from 'react';

const Footer = () => {
    return (
      <footer className="footer mt-auto py-3 text-center align-middle border-top shadow">
        <div className="container">
          <span className="text-muted">&copy; Tzahi Tamam  - {new Date().getFullYear()}</span>
        </div>
      </footer>
    );
}

export default Footer;
