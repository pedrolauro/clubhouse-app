import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends Component {
  buildNavLinks = routes => routes.map(route => (
    <li key={route.menu} className="Sidebar_li">
      <NavLink
        exact={route.exact}
        to={route.path}
        className="Sidebar_navlink"
        activeClassName="Sidebar_selected"
      >
        {route.menu}
      </NavLink>
    </li>
  ))

  render() {
    const { routes } = this.props
    return (
      <div className="Sidebar">
        <ul className="Sidebar_ul">
          { this.buildNavLinks(routes) }
        </ul>
      </div>
    )
  }
}
