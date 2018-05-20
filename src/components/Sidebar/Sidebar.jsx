import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

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

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    menu: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.boolean,
    main: PropTypes.func.isRequired,
  })).isRequired,
}
