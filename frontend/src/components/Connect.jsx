import React from 'react';
import Container from 'react-bootstrap/Container';
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons


function Connect() {
  return (
    <div className="connect-banner" id='connect'>
    <Container className="connect-content">
      <h2>Let's Connect</h2>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-github"></i>
        </a>
      </div>

      {/* Copyright Text */}
      <p className="copyright">© 2024 YourWebsite. All Rights Reserved.</p>
    </Container>
  </div>
);
}

export default Connect;