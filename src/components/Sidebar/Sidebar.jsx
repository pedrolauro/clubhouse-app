import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends Component {
  buildLinks = routes => routes.map(route => (
    <li key={route.menu}>
      <Link to={route.path}>{route.menu}</Link>
    </li>
  ))

  render() {
    const { routes } = this.props
    return (
      <div className="sidebar">
        <ul>
          { this.buildLinks(routes) }
        </ul>
      </div>
    )
  }
}
