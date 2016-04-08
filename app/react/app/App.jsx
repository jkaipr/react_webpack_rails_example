import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import authActions from '../auth/authActions';

import Menu from '../menu/Menu';

export class App extends Component {
  componentWillReceiveProps(nextProps) {
    const { auth, logout } = nextProps;
    const currentTime = (new Date()).getTime();

    if (auth.token && auth.expires && auth.expires < currentTime) {
      logout();
    }
  }

  render() {
    return (
      <div className="app" id="outer-container">
        <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <div id="page-wrap">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: authActions.logout.request
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
