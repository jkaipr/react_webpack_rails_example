import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { propTypes as formPropTypes } from 'redux-form';
import { createValueFromString, createEmptyValue } from 'react-rte';

import Loading from './../app/Loading';
import rteActions from './../rte/rteActions';
import TicketFormInputs from './TicketFormInputs';

export class TicketForm extends Component {

  componentWillReceiveProps({ initializeEditor, isRteInitialized, newTicket, ticket }) {
    if (newTicket && !isRteInitialized) {
      initializeEditor(createEmptyValue());
      return;
    }
    if (ticket && !isRteInitialized) {
      const editorValue = createValueFromString(ticket.description, 'html');
      initializeEditor(editorValue);
    }
  }

  componentWillUnmount() {
    this.props.clearEditor();
  }

  render() {
    const { fields: { subject, description },
      backBtnLabel, descriptionEditorValue, handleSubmit, loading, newTicket,
      onBack, onSubmit, submitBtnLabel, ticket, ticketError, title } = this.props;

    if (loading || (!newTicket && !ticket)) {
      return <Loading />;
    }

    return (
      <div className="container ticket">
        <Button onClick={onBack}>{backBtnLabel}</Button>
        <div className="well">
          <h2>{title}</h2>
          <form onSubmit={handleSubmit(
            onSubmit.bind(null, {
              subject: subject.value,
              description: descriptionEditorValue.toString('html')
            }))}
          >
            <TicketFormInputs {...{ subject, description, ticketError,
              submitLabel: submitBtnLabel }}
            />
          </form>
        </div>
      </div>
    );
  }
}

TicketForm.propTypes = {
  ...formPropTypes,
  admin: PropTypes.bool.isRequired,
  descriptionEditorValue: PropTypes.object.isRequired,
  backBtnLabel: PropTypes.string.isRequired,
  clearEditor: PropTypes.func.isRequired,
  isRteInitialized: PropTypes.bool.isRequired,
  initializeEditor: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTicket: PropTypes.func.isRequired,
  newTicket: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  routerPush: PropTypes.func.isRequired,
  submitBtnLabel: PropTypes.string.isRequired,
  ticket: PropTypes.object,
  ticketError: PropTypes.string,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    admin: state.auth.admin,
    descriptionEditorValue: state.rte.value,
    isRteInitialized: state.rte.initialized,
    loading: state.ticket.loading,
    ticketError: state.ticket.error,
    ticket: state.ticket.ticket,
    userId: state.auth.id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initializeEditor: rteActions.initialize,
    clearEditor: rteActions.clear
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);
