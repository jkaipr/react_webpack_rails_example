import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, Col, Label, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routerActions } from 'react-router-redux';

import ticketActions from './ticketActions';

import BackToListBtn from './BackToListBtn';
import Loading from './../app/Loading';
import TicketStatusBadge from './TicketStatusBadge';

// component
class Ticket extends Component {
  constructor() {
    super();
    this.backToList = this.backToList.bind(this);
  }

  componentDidMount() {
    this.props.loadTicket(this.props.params.id);
  }

  backToList() {
    const { routerPush } = this.props;
    routerPush('/tickets');
  }

  render() {
    const { ticket, loading } = this.props;

    if (loading || !ticket) {
      return <Loading />;
    }

    const { admin, authenticated, destroyTicket, userId } = this.props;
    const canEdit = admin || (authenticated && userId === ticket.user_id);

    return (
      <div className="container ticket">
        <Button onClick={this.backToList}>Back to list</Button>
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
              <Link to={`/tickets/${ticket.id}/edit`}>
                <Button bsStyle="primary">Edit</Button>
              </Link>
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
  routerPush: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  ticket: PropTypes.shape({
    created_at: PropTypes.string,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
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
    destroyTicket: ticketActions.destroy.request,
    loadTicket: ticketActions.item.request,
    routerPush: routerActions.push
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
