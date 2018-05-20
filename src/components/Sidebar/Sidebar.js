import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Sidebar.css';

export default class Sidebar extends Component {
  buildLinks = (routes) => {
    return routes.map((route, index) => (
      <li key={index}>
        <Link to={route.path}>{route.menu}</Link>
      </li>
    ))
  }

  render() {
    return (
      <div className="sidebar">
        <ul>
          { this.buildLinks(this.props.routes) }
        </ul>
      </div>
    )
  }
}