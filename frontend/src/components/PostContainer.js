import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { getPostById, getCategoryByPath, isLoading, getCommentsById } from '../reducers/selectors';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import * as moment from 'moment';
import VoteComponent from './VoteComponent';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ClockIcon from 'material-ui/svg-icons/action/schedule';
import UserIcon from 'material-ui/svg-icons/social/person';
import FlatButton from 'material-ui/FlatButton';
import { deletePost, votePost, fetchComments, deleteComment, voteComment } from '../actions';
import Avatar from 'material-ui/Avatar';
import moreMenu from './MoreMenu';

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

function Post(props) {
  let {post} = props;
  return (
    <Card style={styles.card}>
      <CardHeader
        title={<span><UserIcon style={styles.icon}/>{` ${post.author}`}</span>}
        subtitle={<span><ClockIcon style={styles.icon}/>{` ${moment(+post.timestamp).fromNow()}`}</span>}
        avatar="/User.png"
      />
      <CardTitle style={{paddingTop: 0, paddingBottom: 0}} title={post.title}>

      </CardTitle>
      <CardText>
        {post.body}
      </CardText>
      <CardActions>
        <VoteComponent
          voteScore={post.voteScore}
          onUpVote={(event) => props.onVotePost(post.id, 'upVote', event)}
          onDownVote={(event) => props.onVotePost(post.id, 'downVote', event)}
          float={false}
        />
        <FlatButton label="Edit" icon={<EditIcon />} />
        <FlatButton label="Delete" onClick={() => props.onDelete(post.id)} icon={<DeleteIcon />} />
      </CardActions>
    </Card>
  )
}

class PostContainer extends Component {

  onVotePost = (postId, option, event) => {
    event.stopPropagation();
    this.props.votePost(postId, option);
  }

  onVoteComment = (commentId, option, event) => {
    event.stopPropagation();
    this.props.voteComment(commentId, option);
  }

  onDelete = postId => {
    this.props.deletePost(postId);
    this.props.history.goBack();
  }

  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Readable"
          iconElementLeft={
            <IconButton>
              <BackIcon onClick={(e, i) => this.props.history.goBack()}/>
            </IconButton>
          }
        />
        {this.props.postLoading || <Post {...this.props} onVotePost={this.onVotePost} onDelete={this.onDelete}/>}
        {this.props.commentLoading || this.props.comments.map( comment =>
          <div key={comment.id} style={{margin: '20px'}} >
            <Avatar src="/User.png" style={{verticalAlign: 'middle'}} />
            <div style={{display: 'inline-block', margin: '20px', verticalAlign: 'middle'}}>
              <span style={{display: 'block'}}><UserIcon style={styles.icon}/>{` ${comment.author}`}</span>
              <span style={{display: 'block'}}><ClockIcon style={styles.icon}/>{` ${moment(+comment.timestamp).fromNow()}`}</span>
            </div>
            <VoteComponent
              float={false}
              style={{verticalAlign: 'baseline'}}
              voteScore={comment.voteScore}
              onUpVote={(event) => this.onVoteComment(comment.id, 'upVote', event)}
              onDownVote={(event) => this.onVoteComment(comment.id, 'downVote', event)}
            />
            {moreMenu(comment.id, this.props.deleteComment)}
            <Card style={{display: 'flex'}} >
              <div  style={{margin: '20px'}}>
                {comment.body}
              </div>
            </Card>
          </div>
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
    voteComment: (commentId, option) => dispatch(voteComment(commentId, option))
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
