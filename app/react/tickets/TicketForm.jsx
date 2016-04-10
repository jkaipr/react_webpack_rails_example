import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { propTypes as formPropTypes } from 'redux-form';

import Loading from './../app/Loading';
import TicketFormInputs from './TicketFormInputs';

const TicketForm = ({ fields: { subject, description },
  backBtnLabel, handleSubmit, loading, onBack, onSubmit, submitBtnLabel,
  submitting, submitFailed, ticket, ticketError }) => {
  if (loading || !ticket) {
    return <Loading />;
  }

  return (
    <div className="container ticket">
      <Button onClick={onBack}>{backBtnLabel}</Button>
      <div className="well">
        <h2>Create ticket</h2>
        <form onSubmit={handleSubmit(
          onSubmit.bind(null, {
            subject: subject.value,
            description: description.value
          }))}
        >
          <TicketFormInputs {...{ subject, description, ticketError,
            submitLabel: submitBtnLabel }}
          />
        </form>
      </div>
    </div>
  );
};

TicketForm.propTypes = {
  ...formPropTypes,
  admin: PropTypes.bool.isRequired,
  backBtnLabel: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTicket: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  routerPush: PropTypes.func.isRequired,
  submitBtnLabel: PropTypes.string.isRequired,
  ticket: PropTypes.object,
  ticketError: PropTypes.string,
  userId: PropTypes.number.isRequired
};

export default TicketForm;
