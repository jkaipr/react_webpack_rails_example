import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import rteActions from './rteActions';

export class RTE extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.updateEditorState(value);
  };

  render () {
    return (
      <RichTextEditor
        value={this.props.value}
        onChange={this.onChange}
      />
    );
  }
}

RTE.propTypes = {
  initialValue: PropTypes.object,
  updateEditorState: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    value: state.rte.value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateEditorState: rteActions.update
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RTE);
