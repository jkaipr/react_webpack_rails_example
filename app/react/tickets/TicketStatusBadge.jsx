import React, { PropTypes } from 'react';
import classNames from 'classnames';

const TicketStatusBadge = ({ state }) => (
  <span className={classNames('label label-default pull-xs-right', {
    'label-default': state === 'open',
    'label-info': state === 'in_progress',
    'label-success': state === 'closed'
  })}
  >{state}</span>
);

TicketStatusBadge.propTypes = {
  state: PropTypes.string.isRequired
};

export default TicketStatusBadge;
