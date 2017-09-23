import React from 'react';
import { Link } from 'react-router-dom';
import image404 from '../assets/404.jpg';
import '../stylesheets/NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <img className="image-404" src={image404} alt="404: page not found." />
      <Link className="go-back" to="/">Take me home</Link>
    </div>
  );
}

export default NotFound
