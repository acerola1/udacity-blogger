import React from 'react';
import { connect } from 'react-redux';
import * as selector from '../reducers/selectors';
import * as actions from '../actions';
import Snackbar from 'material-ui/Snackbar';

function Error(props) {
  return (
    <Snackbar
      open={props.error.open}
      message={props.error.message}
      autoHideDuration={6000}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(actions.closeError()),
  }
}

function mapStateToProps(state, props) {
  return {
    error: selector.getError(state),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error)

