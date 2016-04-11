import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';

const Comment = ({ userEmail, text, createdAt }) => (
  <Row>
    <Col sm={3}>
      <div>{userEmail}</div>
      <div>{createdAt}</div>
    </Col>
    <Col sm={9}>
      <div>{text}</div>
    </Col>
  </Row>
);

Comment.propTypes = {
  createdAt: PropTypes.string,
  text: PropTypes.string,
  userEmail: PropTypes.string
};

export default Comment;
