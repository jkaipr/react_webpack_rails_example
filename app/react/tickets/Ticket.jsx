import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, Col, Label, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ticketActions from './ticketActions';
import Loading from './../app/Loading';
import TicketStatusBadge from './TicketStatusBadge';

// component
class Ticket extends Component {
  componentDidMount() {
    this.props.loadTicket(this.props.params.id);
  }

  render() {
    const { ticket, loading } = this.props;

    if (loading || !ticket) {
      return <Loading />;
    }

    const { admin, authenticated, destroyTicket, updateTicket, userId } = this.props;
    const canEdit = admin || (authenticated && userId === ticket.user_id);

    return (
      <div className="container ticket">
        <Link to="/tickets"><Button bsStyle="info" onClick={this.backToList}>Back</Button></Link>
        <div className="well">
          <h1>{ticket.subject}</h1>
          <Row>
            <Col sm={2}>
              <b>State</b>
            </Col>
            <Col sm={10}>
              <TicketStatusBadge state={ticket.state} />
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <b>Description</b>
            </Col>
            <Col sm={10}>
              <span>{ticket.description}</span>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <b>Created</b>
            </Col>
            <Col sm={10}>
              <span>{ticket.created_at}</span>
            </Col>
          </Row>

          {canEdit &&
            <ButtonToolbar>
              <Button
                className="delete-btn"
                bsStyle="danger"
                onClick={destroyTicket}
              >Delete</Button>
              <Button bsStyle="primary" onClick={updateTicket}>Update</Button>
            </ButtonToolbar>
          }
        </div>
      </div>
    );
  }
}

Ticket.propTypes = {
  admin: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  destroyTicket: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTicket: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  ticket: PropTypes.shape({
    created_at: PropTypes.string,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired
  })
};

// container
function mapStateToProps(state) {
  return {
    admin: state.auth.admin,
    authenticated: state.auth.authenticated,
    loading: state.ticket.loading,
    ticket: state.ticket.ticket,
    userId: state.auth.id
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
