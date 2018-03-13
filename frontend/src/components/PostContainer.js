import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { getPostById, getCategoryByPath, isLoading, getCommentsById } from '../reducers/selectors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import * as moment from 'moment';
import VoteComponent from './VoteComponent';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import { deletePost, votePost, fetchComments } from '../actions';

function Post(props) {
  let {post} = props;
  return (
    <Card>
      <CardHeader
        title={post.author}
        subtitle={moment(+post.timestamp).fromNow()}
        avatar="/User.png"
      />
      <CardTitle title={post.title}>

      </CardTitle>
      <CardText>
        {post.body}
      </CardText>
      <CardActions>
        <VoteComponent
          voteScore={post.voteScore}
          onUpVote={(event) => props.onVote(post.id, 'upVote', event)}
          onDownVote={(event) => props.onVote(post.id, 'downVote', event)}
          float={false}
        />
        <FlatButton label="Edit" icon={<EditIcon />} />
        <FlatButton label="Delete" onClick={() => props.onDelete(post.id)} icon={<DeleteIcon />} />
      </CardActions>
    </Card>
  )
}

class PostContainer extends Component {

  onVote = (postId, option, event) => {
    event.stopPropagation();
    this.props.vote(postId, option);
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
        {this.props.postLoading || <Post {...this.props} onVote={this.onVote} onDelete={this.onDelete}/>}
        {this.props.commentLoading || this.props.comments.map( comment =>
          comment.body
        )}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (postId, option) => dispatch(votePost(postId, option)),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchComments: postId => dispatch(fetchComments(postId))
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
