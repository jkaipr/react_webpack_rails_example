import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import TicketStatusBadge from './TicketStatusBadge';

const TicketListItem = ({ id, description, user_id, created_at, state, subject }) => (
  <Link to={`/tickets/${id}`} className="list-group-item">
    <Row>
      <Col sm={6}>
        <h4 className="list-group-item-heading">{subject}</h4>
      </Col>
      <Col sm={3}>
        <TicketStatusBadge state={state} />
      </Col>
      <Col sm={3}>
        <span className="label label-default pull-xs-right">{created_at}</span>
      </Col>
    </Row>
  </Link>
);

TicketListItem.propTypes = {
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired
};

export default TicketListItem;
