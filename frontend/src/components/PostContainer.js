import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { getPostById, getCategoryByPath, isLoading, getCommentsById, getUserByName } from '../reducers/selectors';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import * as moment from 'moment';
import VoteComponent from './VoteComponent';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ClockIcon from 'material-ui/svg-icons/action/schedule';
import UserIcon from 'material-ui/svg-icons/social/person';
import FlatButton from 'material-ui/FlatButton';
import { deletePost, votePost, fetchComments, deleteComment, voteComment, changeComment, changePost } from '../actions';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import MoreMenu from './MoreMenu';
import AvatarMenu from './AvatarMenu';

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

class Post extends Component {
  state = {
    editing: false,
    title: '',
    body: ''
  }

  onEdit = id => {
    let {post} = this.props;
    this.setState({editing: true, title: post.title, body: post.body});
  }

  onChange = (event, text, name) => this.setState({[name]: text})

  onOk = event => {
    this.props.changePost(this.props.post.id, {
      title: this.state.title,
      body: this.state.body,
      timestamp: Date.now()
    });
    this.setState({editing: false});
  }

  render() {
    let {post} = this.props;
    return (
      <Card style={styles.card}>
        <CardHeader
          title={<span><UserIcon style={styles.icon}/>{` ${post.author}`}</span>}
          subtitle={<span><ClockIcon style={styles.icon}/>{` ${moment(+post.timestamp).fromNow()}`}</span>}
          avatar={this.props.avatar}
          style={{paddingBottom: 0}}
        />
        {!this.state.editing && <CardTitle title={post.title} />}
        <CardText style={{paddingTop: 0}}>
          {!this.state.editing && post.body}
          {this.state.editing &&
            <div>
              <TextField floatingLabelText={'Title'}
                id={post.id+'_title'}
                onChange={(event, text) => this.onChange(event, text, 'title')}
                value={this.state.title}
                style={{display: 'block', width: '100%'}}
              />
              <TextField floatingLabelText={'Body'}
                id={post.id+'_body'}
                multiLine={true}
                onChange={(event, text) => this.onChange(event, text, 'body')}
                value={this.state.body}
                style={{display: 'block', width: '100%'}}
              />
            </div>
          }
        </CardText>
        {!this.state.editing &&
          <CardActions>
            <VoteComponent
              voteScore={post.voteScore}
              onUpVote={(event) => this.props.onVotePost(post.id, 'upVote', event)}
              onDownVote={(event) => this.props.onVotePost(post.id, 'downVote', event)}
              float={false}
            />
            <FlatButton label="Edit" onClick={this.onEdit} icon={<EditIcon />} />
            <FlatButton label="Delete" onClick={() => this.props.onDelete(post.id)} icon={<DeleteIcon />} />
          </CardActions>}
        {this.state.editing &&
          <CardActions>
            <FlatButton label="Cancel" onClick={() => {this.setState({editing: false})}}/>
            <FlatButton label="OK" onClick={this.onOk} />
          </CardActions>}
      </Card>
    )
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
        <Avatar src={this.props.avatar} style={{verticalAlign: 'middle'}} />
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

class PostContainer extends Component {

  onVotePost = (postId, option, event) => {
    event.stopPropagation();
    this.props.votePost(postId, option);
  }

  onDelete = postId => {
    this.props.deletePost(postId);
    this.props.history.goBack();
  }

  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  render() {
    let {post = {}, postLoading, commentLoading} = this.props;
    return (
      <div>
        <AppBar
          title="Readable"
          iconElementLeft={
            <IconButton>
              <BackIcon onClick={(e, i) => this.props.history.goBack()}/>
            </IconButton>
          }
          iconElementRight={
            <AvatarMenu />
          }
        />
        {!post && <div style={{margin: '20px'}}>Post not Found</div>}
        {(post && !postLoading) &&
          <Post
            {...this.props}
            onVotePost={this.onVotePost}
            onDelete={this.onDelete}
            avatar={this.props.getUser(post.author).path}
          />}
        {(post && !commentLoading) && this.props.comments.map( comment =>
          <Comment
            key={comment.id}
            comment={comment}
            voteComment={this.props.voteComment}
            deleteComment={this.props.deleteComment}
            changeComment={this.props.changeComment}
            avatar={this.props.getUser(comment.author).path}
          />
        )}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (postId, option) => dispatch(votePost(postId, option)),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    voteComment: (commentId, option) => dispatch(voteComment(commentId, option)),
    changeComment: (commentId, comment) => dispatch(changeComment(commentId, comment)),
    changePost: (postId, post) => dispatch(changePost(postId, post))
  }
}

function mapStateToProps(state, props) {
  let {categoryPath = '/', postId} = props.match.params;
  return {
    post: getPostById(state, postId),
    postId,
    category: getCategoryByPath(state, categoryPath),
    comments: getCommentsById(state, postId),
    postLoading: isLoading(state, 'post'),
    commentLoading: isLoading(state, 'comment'),
    getUser: userName => getUserByName(state, userName)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
