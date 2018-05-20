import React, { Component } from 'react';
import logo from './../../images/logo.svg';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
    )
  }
}
