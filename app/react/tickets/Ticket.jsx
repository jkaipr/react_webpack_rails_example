import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routerActions } from 'react-router-redux';

import commentActions from './../comments/commentActions';
import ticketActions from './ticketActions';

import CommentList from './../comments/CommentList';
import Loading from './../app/Loading';
import TicketStatusBadge from './TicketStatusBadge';

// component
class Ticket extends Component {
  constructor() {
    super();
    this.backToList = this.backToList.bind(this);
    this.destroyTicket = this.destroyTicket.bind(this);
  }

  backToList() {
    const { routerPush } = this.props;
    routerPush('/tickets');
  }

  componentDidMount() {
    const id = this.props.params.id;
    this.props.loadTicket(id);
    this.props.loadComments();
  }

  destroyTicket() {
    this.props.destroyTicket(this.props.ticket);
  }

  render() {
    const { ticket, loading } = this.props;

    if (loading || !ticket) {
      return <Loading />;
    }

    const { admin, authenticated, comments, loadingComments, userId } = this.props;
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
                onClick={this.destroyTicket}
              >Delete</Button>
              <Link to={`/tickets/${ticket.id}/edit`}>
                <Button bsStyle="primary">Edit</Button>
              </Link>
            </ButtonToolbar>
          }
          <CommentList comments={comments} loading={loadingComments} />
        </div>
      </div>
    );
  }
}

Ticket.propTypes = {
  admin: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  destroyTicket: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingComments: PropTypes.bool.isRequired,
  loadComments: PropTypes.func.isRequired,
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
    comments: state.comment.ticketComments,
    loading: state.ticket.loading,
    loadingComments: state.comment.loading,
    ticket: state.ticket.ticket,
    userId: state.auth.id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addComment: commentActions.comment.request,
    destroyTicket: ticketActions.destroy.request,
    loadComments: commentActions.list.request,
    loadTicket: ticketActions.item.request,
    routerPush: routerActions.push
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
