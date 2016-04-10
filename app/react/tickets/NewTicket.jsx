import React, { Component, PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';

import TicketForm from './TicketForm';
import { ticketSchema } from './TicketFormInputs';
import ticketActions from './ticketActions';

const FORM_NAME = 'newTicket';

class NewTicket extends Component {
  constructor() {
    super();
    this.backToList = this.backToList.bind(this);
  }

  backToList() {
    const { routerPush } = this.props;
    routerPush('/tickets');
  }

  render() {
    const { create, ...rest } = this.props;

    return (
      <TicketForm
        backBtnLabel="Back to list"
        onBack={this.backToList}
        submitBtnLabel="Create"
        onSubmit={create}
        {...rest}
        ticket={{ subject: '', description: '' }}
      />
    );
  }
}

NewTicket.propTypes = {
  ...formPropTypes,
  admin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTicket: PropTypes.func.isRequired,
  routerPush: PropTypes.func.isRequired,
  ticket: PropTypes.object,
  ticketError: PropTypes.string,
  create: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
};

export default reduxForm({
  form: FORM_NAME,
  fields: ticketSchema.fields,
  validate: ticketSchema.validate
}, state => ({
  admin: state.auth.admin,
  loading: state.ticket.loading,
  ticketError: state.ticket.error,
  ticket: state.ticket.ticket,
  userId: state.auth.id
}), {
  loadTicket: ticketActions.item.request,
  routerPush: routerActions.push,
  create: ticketActions.create.request
})(NewTicket);
