import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ticketActions from './ticketActions';

// component
class Ticket extends Component {
  componentDidMount() {
    this.props.loadTicket(this.props.params.id);
  }

  render() {
    const { ticket, loading } = this.props;
    if (loading || !ticket) {
      return <div>Loading...</div>;
    }

    const { updateTicket, destroyTicket } = this.props;
    return (
      <div>
        {loading || !ticket && <div>Loading...</div>}
        {!loading && ticket &&
          <div>
            <h1>{name}</h1>
            <div className="description">
              {ticket.description}
            </div>
          </div>
        }
      </div>
    );
  }
}

Ticket.propTypes = {
  destroyTicket: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTicket: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired,
  ticket: PropTypes.shape({
    createdAt: PropTypes.string,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired
  })
};

// container
function mapStateToProps(state) {
  return {
    loading: state.ticket.loading,
    ticket: state.ticket.ticket
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTicket: ticketActions.item.request,
    updateTicket: ticketActions.update.request,
    destroyTicket: ticketActions.destroy.request
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
