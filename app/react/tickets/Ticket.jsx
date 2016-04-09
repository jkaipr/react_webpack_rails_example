import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, Col, Label, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
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

    const { admin, authenticated, destroyTicket, updateTicket, userId } = this.props;

    const canEdit = admin || (authenticated && userId === ticket.user_id);

    return (
      <div className="container ticket">
        <Button bsStyle="info" onclick={goBack}>Back</Button>
        {loading || !ticket && <div>Loading...</div>}
        {!loading && ticket &&
          <div className="well">
            <h1>{ticket.subject}</h1>
            <Row>
              <Col sm={2}>
                <Label>State</Label>
              </Col>
              <Col sm={10}>
                <span>{ticket.state}</span>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Label>Description</Label>
              </Col>
              <Col sm={10}>
                <span>{ticket.description}</span>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Label>Created</Label>
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
        }
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
