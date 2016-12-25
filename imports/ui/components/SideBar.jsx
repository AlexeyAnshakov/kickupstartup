import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class SideBar extends Component {
  logout(e) {
    e.preventDefault();
    console.log('logout link clicked');
    if (Meteor.userId()) {
      Meteor.logout();
    }
  }
  render () {
    return (
      <div>
        {/* SIDEBAR */}
        {/* Sidebar button open */}
        <div className="sidebar__btn sidebar__btn_open hidden">
            <span className="fa fa-bars fa-lg sidebar-btn__icon sidebar-btn-icon__unhover" title="Open menu" aria-hidden="true"></span>
            <span className="fa fa-arrow-circle-right fa-lg sidebar-btn__icon sidebar-btn-icon__hover" title="Open menu" aria-hidden="true"></span>
        </div>

        {/* Sidebar menu */}
        <div className="sidebar__menu scrollspy_menu">

            {/* Sidebar button close */}
            <div className="sidebar__btn sidebar__btn_close show">
                <span className="fa fa-bars fa-lg sidebar-btn__icon sidebar-btn-icon__unhover" title="Close menu" aria-hidden="true"></span>
                <span className="fa fa-arrow-circle-left fa-lg sidebar-btn__icon sidebar-btn-icon__hover" title="Close menu" aria-hidden="true"></span>
            </div>

            {/* Sidebar brand name */}
            <div className="sidebar-menu__brand"></div>
            {/* Sidebar links */}

            <ul className="fullpage__nav sidebar-menu__ul nav">
                <li><a href="#">News</a></li>
                <li className="active"><a href="#">Connections</a></li>
                <li><a href="#">Startups</a></li>
                <li><a href="#">Teams</a></li>
                <li className="divider"></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        </div>
        {/* / .sidebar-menu__ul */}
      </div>
    )
  }
}
