import Radium from 'radium';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { slide as SideMenu } from 'react-burger-menu';

import menuActions from './menuActions';

const RLink = Radium(Link);

export const AppMenu = (props) => {
  const { hide, isOpen, pageWrapId, outerContainerId } = props;
  return (
    <SideMenu isOpen={isOpen} pageWrapId={pageWrapId} outerContainerId={outerContainerId}>
      <RLink onClick={hide} to="/login"><span>Login</span></RLink>
      <RLink onClick={hide} to="/tickets"><span>Tickets</span></RLink>
      <RLink onClick={hide} to="/comments"><span>Comments</span></RLink>
    </SideMenu>
  );
};

AppMenu.propTypes = {
  isOpen: PropTypes.bool,
  hide: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isOpen: state.menu.showMenu
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hide: menuActions.hide.request
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
