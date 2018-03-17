import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {grey400} from 'material-ui/styles/colors';

export default function MoreMenu(props) {
  const {onEdit, onDelete, id, ...rest} = props
  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );
  return (
    <IconMenu {...rest} iconButtonElement={iconButtonElement}>
      <MenuItem leftIcon={<EditIcon />} onClick={() => onEdit(id)}>Edit</MenuItem>
      <MenuItem leftIcon={<DeleteIcon />}  onClick={() => onDelete(id)}>Delete</MenuItem>
    </IconMenu>
)};
