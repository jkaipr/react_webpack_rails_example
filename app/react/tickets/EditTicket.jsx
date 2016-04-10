import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { routerActions } from 'react-router-redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';

import Loading from './../app/Loading';
import TicketFormInputs, { ticketSchema } from './TicketFormInputs';
import ticketActions from './ticketActions';

const FORM_NAME = 'editTicket';

class EditTicket extends Component {
  constructor() {
    super();
    this.backToDetail = this.backToDetail.bind(this);
  }

  componentDidMount() {
    if (!this.props.ticket) this.props.loadTicket(this.props.params.id);
  }

  backToDetail() {
    const { ticket: { id }, routerPush } = this.props;
    routerPush(`/tickets/${id}`);
  }

  render() {
    const { fields: { subject, description },
      handleSubmit, loading, submitting, submitFailed, ticket, ticketError, update } = this.props;

    if (loading || !ticket) {
      return <Loading />;
    }

    return (
      <div className="container ticket">
        <Button onClick={this.backToDetail}>Back to detail</Button>
        <div className="well">
          <h2>Edit ticket</h2>
          <form onSubmit={handleSubmit(
            update.bind(null, {
              subject: subject.value,
              description: description.value
            }))}
          >
            <TicketFormInputs {...{ subject, description, ticketError, submitLabel: 'Update' }} />
          </form>
        </div>
      </div>
    );
  }
}

EditTicket.propTypes = {
  ...formPropTypes,
  admin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTicket: PropTypes.func.isRequired,
  routerPush: PropTypes.func.isRequired,
  ticket: PropTypes.object,
  ticketError: PropTypes.string,
  update: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
};

export default reduxForm({
  form: FORM_NAME,
  fields: ticketSchema.fields,
  validate: ticketSchema.validate
}, state => ({
  admin: state.auth.admin,
  initialValues: state.ticket.ticket,
  loading: state.ticket.loading,
  ticketError: state.ticket.error,
  ticket: state.ticket.ticket,
  userId: state.auth.id
}), {
  loadTicket: ticketActions.item.request,
  routerPush: routerActions.push,
  update: ticketActions.update.request
})(EditTicket);
