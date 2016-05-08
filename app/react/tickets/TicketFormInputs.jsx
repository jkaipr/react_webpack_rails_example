import React, { PropTypes } from 'react';
import { ButtonInput, Input } from 'react-bootstrap';
import buildSchema from 'redux-form-schema';

import RTE from '../rte/RTE'

export const ticketSchema = buildSchema({
  subject: {
    label: 'Subject',
    required: true
  }
});

const TicketFormInputs = ({ description, subject, submitLabel, ticketError }) => (
  <div>
    {ticketError &&
      <div className="alert alert-danger" role="alert">
        {ticketError.message}
      </div>
    }
    <Input type="text" label="Subject" placeholder="Enter subject" {...subject} value={subject.value || ''} />
    <RTE/>

    <ButtonInput bsStyle="primary" type="submit" value={submitLabel} />
  </div>
);

TicketFormInputs.propTypes = {
  description: PropTypes.object,
  subject: PropTypes.object,
  submitLabel: PropTypes.string.isRequired,
  ticketError: PropTypes.string
};

export default TicketFormInputs;
