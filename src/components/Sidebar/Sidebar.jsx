import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default class Sidebar extends Component {
  buildNavLinks = routes => routes.map(route => (
    <NavLink
      key={route.menu}
      exact={route.exact}
      to={route.path}
      className="Sidebar_navlink"
      activeClassName="Sidebar_selected"
    >
      {route.menu}
    </NavLink>
  ))

  render() {
    const { routes } = this.props
    return (
      <div className="Sidebar">
        <h4 className="Sidebar_header">
          Regatta Planner
        </h4>
        { this.buildNavLinks(routes) }
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
