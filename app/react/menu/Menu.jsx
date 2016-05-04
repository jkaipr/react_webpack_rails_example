import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { slide as SideMenu } from 'react-burger-menu';

import menuActions from './menuActions';
import authActions from './../auth/authActions';

const RLink = Radium(Link);

export class AppMenu extends Component {
  constructor() {
    super();
    this.logoutUser = this.logoutUser.bind(this);
    this.handleMenuStateChange = this.handleMenuStateChange.bind(this);
  }

  logoutUser() {
    this.props.logout();
    this.props.hideMenu();
  }

  handleMenuStateChange(state) {
    if (state.isOpen == this.props.isOpen) return;
    if (state.isOpen) {
      this.props.showMenu();
    } else {
      this.props.hideMenu();
    }
  }

  render() {
    const { authenticated, hideMenu, isOpen, pageWrapId, outerContainerId } = this.props;
    let authLink = null;

    if (authenticated) {
      authLink = (
        <RLink onClick={this.logoutUser} to="/tickets">
          <span>Logout</span>
        </RLink>);
    } else {
      authLink = <RLink onClick={hideMenu} to="/login"><span>Login</span></RLink>;
    }

    return (
      <SideMenu isOpen={isOpen} onStateChange={this.handleMenuStateChange} pageWrapId={pageWrapId} outerContainerId={outerContainerId}>
        {authLink}
        <RLink onClick={hideMenu} to="/tickets"><span>Tickets</span></RLink>
        <RLink onClick={hideMenu} to="/comments"><span>Comments</span></RLink>
      </SideMenu>
    );
  }
}

AppMenu.propTypes = {
  authenticated: PropTypes.bool,
  isOpen: PropTypes.bool,
  hideMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isOpen: state.menu.showMenu,
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideMenu: menuActions.hide.request,
    showMenu: menuActions.show.request,
    logout: authActions.logout.request
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
