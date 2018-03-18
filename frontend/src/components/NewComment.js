import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedUser } from '../reducers/selectors';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';
import uuid from 'uuid';

class NewComment extends Component {
  state = {
    body: ''
  }

  onChange = (event, body) => {
    if (body.endsWith('\n')) {
      this.onOk();
    } else {
      this.setState({body});
    }
  }

  onOk = () => {
    let comment = {
      id: uuid(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.props.selectedUser.name,
      parentId: this.props.post.id
    }
    this.props.createComment(comment);
    this.setState({body: ''});
  }

  render() {
    return (
      <div style={{margin: '20px', display: 'flex'}}>
        <Avatar src={this.props.selectedUser.path} style={{verticalAlign: 'top'}} />
        <TextField
          style={{marginLeft: '20px', width: '100%'}}
          id={'new-comment-field'}
          multiLine={true}
          onChange={this.onChange}
          value={this.state.body}
          hintText={`Hey ${this.props.selectedUser.name} write a comment...`}
        />
        <FlatButton label="OK" onClick={this.onOk} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: (comment) => dispatch(actions.createComment(comment))
  }
}

function mapStateToProps(state, props) {
  return {
    selectedUser: getSelectedUser(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment);
