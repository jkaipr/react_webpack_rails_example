import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TicketItem from './TicketListItem';
import ticketActions from './ticketActions';

class TicketList extends Component {
  componentDidMount() {
    this.props.loadTickets();
  }

  render() {
    const { loading, tickets } = this.props;

    return (
      <div className="container">
        <div className="row tickets-list">
          {loading && <div>Loading...</div>}
          {!loading &&
            <div className="list-group">
              {tickets.map(ticket => (
                <TicketItem key={ticket.id} {...ticket} />
                ))
              }
            </div>
          }
          <div></div>
        </div>
      </div>
    );
  }
}


TicketList.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadTickets: PropTypes.func.isRequired,
  tickets: PropTypes.array
};

function mapStateToProps(state) {
  return {
    loading: state.ticket.loading,
    tickets: state.ticket.tickets
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTickets: ticketActions.list.request
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
