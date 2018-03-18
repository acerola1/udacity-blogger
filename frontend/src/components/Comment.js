import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Card, CardActions} from 'material-ui/Card';
import * as moment from 'moment';
import VoteComponent from './VoteComponent';
import ClockIcon from 'material-ui/svg-icons/action/schedule';
import UserIcon from 'material-ui/svg-icons/social/person';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import MoreMenu from './MoreMenu';
import { deleteComment, voteComment, changeComment } from '../actions';
import { getUserByName } from '../reducers/selectors';

const styles = {
  card: {
    margin: '20px'
  },
  icon: {
    width: 16,
    height: 16,
    verticalAlign: 'top'
  }
}

class Comment extends Component {

  state = {editing: false, editedComment: ''};

  onVoteComment = (commentId, option, event) => {
    event.stopPropagation();
    this.props.voteComment(commentId, option);
  }

  onEdit = id => {
    this.setState({editing: true, editedComment: this.props.comment.body});
  }

  onCommentChange = (event, editedComment) => this.setState({editedComment})

  onOk = event => {
    this.props.changeComment(this.props.comment.id, {
      body: this.state.editedComment,
      timestamp: Date.now()
    });
    this.setState({editing: false, editedComment: ''});
  }

  render() {
    const {comment} = this.props;
    return (
      <div style={{margin: '20px', position: 'relative'}} >
        <Avatar src={this.props.getUser(comment.author).path} style={{verticalAlign: 'middle'}} />
        <div style={{display: 'inline-block', margin: '20px', verticalAlign: 'middle'}}>
          <span style={{display: 'block'}}><UserIcon style={styles.icon}/>{` ${comment.author}`}</span>
          <span style={{display: 'block'}}><ClockIcon style={styles.icon}/>{` ${moment(+comment.timestamp).fromNow()}`}</span>
        </div>
        <div style={{display: 'block', position: 'absolute', top: '12px', right: '4px'}} >
          <VoteComponent
            float={false}
            style={{verticalAlign: 'top'}}
            voteScore={comment.voteScore}
            onUpVote={(event) => this.onVoteComment(comment.id, 'upVote', event)}
            onDownVote={(event) => this.onVoteComment(comment.id, 'downVote', event)}
          />
          {<MoreMenu id={comment.id} onDelete={this.props.deleteComment} onEdit={this.onEdit} />}
        </div>
        <Card style={{display: 'flex'}} >
          <div  style={{margin: '20px'}}>
            {!this.state.editing && comment.body}
            {this.state.editing &&
              <TextField floatingLabelText={'Comment'}
                id={comment.id}
                multiLine={true}
                onChange={this.onCommentChange}
                value={this.state.editedComment}
              />}
            {this.state.editing &&
              <CardActions>
                <FlatButton label="Cancel" onClick={() => {this.setState({editing: false})}}/>
                <FlatButton label="OK" onClick={this.onOk} />
              </CardActions>
            }
          </div>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    voteComment: (commentId, option) => dispatch(voteComment(commentId, option)),
    changeComment: (commentId, comment) => dispatch(changeComment(commentId, comment))
  }
}

function mapStateToProps(state, props) {
  return {
    getUser: userName => getUserByName(state, userName)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
