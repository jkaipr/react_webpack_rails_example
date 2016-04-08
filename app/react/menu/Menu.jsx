import Radium from 'radium';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { slide as SideMenu } from 'react-burger-menu';

import menuActions from './menuActions';
import authActions from './../auth/authActions';

const RLink = Radium(Link);


export const AppMenu = (props) => {
  const { authenticated, hide, logout, isOpen, pageWrapId, outerContainerId } = props;
  const logoutUser = () => {
    logout();
    hide();
  };
  let authLink = null;

  if (authenticated) {
    authLink = (
      <RLink onClick={logoutUser} to="/tickets">
        <span>Logout</span>
      </RLink>);
  } else {
    authLink = <RLink onClick={hide} to="/login"><span>Login</span></RLink>;
  }

  return (
    <SideMenu isOpen={isOpen} pageWrapId={pageWrapId} outerContainerId={outerContainerId}>
      {authLink}
      <RLink onClick={hide} to="/tickets"><span>Tickets</span></RLink>
      <RLink onClick={hide} to="/comments"><span>Comments</span></RLink>
    </SideMenu>
  );
};

AppMenu.propTypes = {
  authenticated: PropTypes.bool,
  isOpen: PropTypes.bool,
  hide: PropTypes.func.isRequired,
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
    hide: menuActions.hide.request,
    logout: authActions.logout.request
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
