import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import VoteComponent from './VoteComponent';
import ClockIcon from 'material-ui/svg-icons/action/schedule';
import UserIcon from 'material-ui/svg-icons/social/person';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import MoreMenu from './MoreMenu';
import {grey600} from 'material-ui/styles/colors';
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
const defaultState = {editing: false, body: ''};

class Comment extends Component {
  state = defaultState;

  onVoteComment = (commentId, option, event) => {
    event.stopPropagation();
    this.props.voteComment(commentId, option);
  }

  onEdit = id => {
    this.setState({editing: true, body: this.props.comment.body});
  }

  onChange = (event, body) => {
    if (body.endsWith('\n')) {
      this.onOk();
    } else {
      this.setState({body});
    }
  }

  onOk = event => {
    this.props.changeComment(this.props.comment.id, {
      body: this.state.body,
      timestamp: Date.now()
    });
    this.setState(defaultState);
  }

  render() {
    const {comment} = this.props;
    return (
      <div style={{margin: '20px', display: 'flex', position: 'relative'}} >
        <Avatar src={this.props.getUser(comment.author).path} style={{verticalAlign: 'top'}} />
        <div  style={{width: '100%', marginLeft: '20px', whiteSpace:'pre-wrap'}}>
          {!this.state.editing && comment.body}
          {this.state.editing &&
            <TextField
              id={comment.id}
              multiLine={true}
              onChange={this.onChange}
              value={this.state.body}
              style={{width: '100%', marginTop: '-10px'}}
            />}
          {this.state.editing &&
            <div style={{width: '210px'}} >
              <FlatButton label="Cancel" onClick={() => {this.setState({editing: false})}}/>
              <FlatButton label="OK" onClick={this.onOk} />
            </div>
          }
          <div style={{display: 'block', color: grey600, marginTop: '5px', verticalAlign: 'middle', fontSize: '14px'}}>
            <span style={{display: 'inline-block'}}><UserIcon style={styles.icon}/>{` ${comment.author}, `}</span>
            <span style={{display: 'inline-block'}}><ClockIcon style={styles.icon}/>{` ${moment(+comment.timestamp).fromNow()}`}</span>
          </div>
        </div>
        <div style={{display: 'block', minWidth: '190px'}} >
          <MoreMenu
            id={comment.id}
            style={{float: 'right'}}
            onDelete={(id) => this.props.deleteComment(id)}
            onEdit={this.onEdit}
          />
          <VoteComponent
            float={false}
            style={{verticalAlign: 'top', float: 'right'}}
            voteScore={comment.voteScore}
            onUpVote={(event) => this.onVoteComment(comment.id, 'upVote', event)}
            onDownVote={(event) => this.onVoteComment(comment.id, 'downVote', event)}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (commentId, post) => dispatch(deleteComment(commentId, post)),
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
