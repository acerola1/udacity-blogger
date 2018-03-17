import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { getUsers, getSelectedUser } from '../reducers/selectors';
import { setSelectedUser } from '../actions';

const AvatarMenu = (props) => {
  let {dispatch, selectedUser, setSelectedUser, ...rest} = props;
  return (
    <IconMenu
      {...rest}
      style={{marginTop: '-8px', marginRight: '16px'}}
      value={selectedUser.name}
      onItemClick={(event, child) => setSelectedUser(child.props.value)}
      iconButtonElement={
        <IconButton><Avatar src={selectedUser.path} /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      {props.users.map(user =>
        <MenuItem
          key={user.name}
          primaryText={user.name}
          leftIcon={<Avatar src={user.path} />}
          value={user.name}
        />)}

    </IconMenu>
)};

function mapStateToProps(state, props) {
  return {
    users: getUsers(state),
    selectedUser: getSelectedUser(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedUser: (name) => dispatch(setSelectedUser(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarMenu);
