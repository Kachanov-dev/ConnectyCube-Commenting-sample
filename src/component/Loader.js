import * as React from 'react';
import logo from '../images/logo.png';
import Loader from './loader/loader'
import './css/App.css'

export default function LoaderSection() {
  return (
    <div className="loader">
      <img src={logo} alt="Logo" />
      <Loader />
    </div>
  );
};