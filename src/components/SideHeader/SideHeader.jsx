import React, { Component } from 'react'
import logo from './../../images/logo.svg'
import './SideHeader.css'

export default class SideHeader extends Component {
  render() {
    return (
      <div className="SideHeader">
        <img src={logo} className="SideHeader_logo" alt="logo" />
      </div>
    )
  }
}
