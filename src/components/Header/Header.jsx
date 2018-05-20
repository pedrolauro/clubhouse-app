import React, { Component } from 'react';
import logo from './../../images/logo.svg';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img src={logo} className="Header_logo" alt="logo" />
      </div>
    )
  }
}
