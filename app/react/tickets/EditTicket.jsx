import React, { Component, PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';

import TicketForm from './TicketForm';
import { ticketSchema } from './TicketFormInputs';
import ticketActions from './ticketActions';

const FORM_NAME = 'editTicket';

class EditTicket extends Component {
  constructor() {
    super();
    this.backToDetail = this.backToDetail.bind(this);
  }

  backToDetail() {
    const { ticket: { id }, routerPush } = this.props;
    routerPush(`/tickets/${id}`);
  }

  componentWillMount() {
    if (!this.props.ticket) {
      const id = this.props.params.id;
      this.props.loadTicket(id);
    }
  }

  render() {
    const { update, ...rest } = this.props;

    return (
      <TicketForm
        backBtnLabel="Back to detail"
        onBack={this.backToDetail}
        submitBtnLabel="Update"
        onSubmit={update}
        {...rest}
        title="Edit ticket"
      />
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
  loading: state.ticket.loading,
  initialValues: state.ticket.ticket,
  ticketError: state.ticket.error,
  ticket: state.ticket.ticket,
  userId: state.auth.id
}), {
  loadTicket: ticketActions.item.request,
  routerPush: routerActions.push,
  update: ticketActions.update.request
})(EditTicket);
