import React, { Component, PropTypes } from 'react';
import { Button, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import Loading from './../app/Loading';
import TicketItem from './TicketListItem';
import ticketActions from './ticketActions';

class TicketList extends Component {
  constructor() {
    super();
    this.newTicket = this.newTicket.bind(this);
  }

  componentDidMount() {
    this.props.loadTickets();
  }

  newTicket() {
    this.props.routerPush('/tickets/new');
  }

  render() {
    const { authenticated, loading, tickets } = this.props;

    if (loading || !tickets) {
      return <Loading />;
    }

    return (
      <div className="container">
        {authenticated &&
          <Row className="bottom-margin-15">
            <Button bsStyle="primary" onClick={this.newTicket}>New ticket</Button>
          </Row>
        }
        <div className="row tickets-list">
          <div className="list-group">
            {tickets.map(ticket => (
              <TicketItem key={ticket.id} {...ticket} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}


TicketList.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTickets: PropTypes.func.isRequired,
  routerPush: PropTypes.func.isRequired,
  tickets: PropTypes.array
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    loading: state.ticket.loading,
    tickets: state.ticket.tickets
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTickets: ticketActions.list.request,
    routerPush: routerActions.push
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
