import * as React from 'react';
import logo from '../images/logo.png';
import './css/App.css'

export default function Loader() {
  return (
    <div className="loader">
      <img src={logo} alt="Logo" />
      <div className="container-loader">
        <div className="loader-content"></div>
      </div>
    </div>
  );
};