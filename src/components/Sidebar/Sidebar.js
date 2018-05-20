import React, { Component } from 'react';
import './Sidebar.css';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li>Categorias</li>
          <li>Atletas</li>
        </ul>
      </div>
    )
  }
}