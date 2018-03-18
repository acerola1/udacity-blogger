import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as cons from '../utils/constants';
import {grey600} from 'material-ui/styles/colors';
import { getSorting } from '../reducers/selectors';
import * as actions from '../actions';

function SortingSelection(props) {
  let {setSorting, ...rest} = props;
  return (
    <SelectField
      {...rest}
      labelStyle={{color: grey600}}
      value={props.sorting}
      onChange={(event, index, value) => setSorting(value)}
    >
      <MenuItem value={cons.SCORE_DESC} primaryText="Highest score first" />
      <MenuItem value={cons.SCORE_ASC} primaryText="Lowest score first" />
      <MenuItem value={cons.TIME_DESC} primaryText="Newest first" />
      <MenuItem value={cons.TIME_ASC} primaryText="Oldest first" />
    </SelectField>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setSorting: (value) => dispatch(actions.setSorting(value)),
  }
}

function mapStateToProps(state, props) {
  return {
    sorting: getSorting(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortingSelection)
