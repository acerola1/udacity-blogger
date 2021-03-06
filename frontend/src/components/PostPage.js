import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { getPostById, getCategoryByPath, isLoading, getCommentsByPostId, getUserByName } from '../reducers/selectors';
import { deletePost, votePost, fetchComments, changePost } from '../actions';
import AvatarMenu from './AvatarMenu';
import Divider from 'material-ui/Divider';
import Post from './Post';
import Comment from './Comment';
import NewComment from './NewComment';
import CircularProgress from 'material-ui/CircularProgress';

class PostPage extends Component {

  onVotePost = (postId, option, event) => {
    event.stopPropagation();
    this.props.votePost(postId, option);
  }

  onDelete = postId => {
    this.props.deletePost(postId);
    this.goBack();
  }

  goBack = () => {
    this.props.history.push('/');
  }

  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  render() {
    let {post, postLoading, commentLoading} = this.props;
    return (
      <div>
        <AppBar
          title="Blogger"
          iconElementLeft={
            <IconButton onClick={(e, i) => this.goBack()}>
              <BackIcon/>
            </IconButton>
          }
          iconElementRight={
            <AvatarMenu />
          }
        />
        {postLoading && <CircularProgress style={{margin: '30px', display: 'box'}} />}
        {!post && !postLoading && <div style={{margin: '20px'}}>Post not Found</div>}
        {(post && !postLoading) &&
          <Post
            {...this.props}
            onVotePost={this.onVotePost}
            onDelete={this.onDelete}
            avatar={this.props.getUser(post.author).path}
            mode={this.props.mode}
            history={this.props.history}
          />}
        {commentLoading && <CircularProgress style={{margin: '30px', display: 'box'}} />}
        {(post && !commentLoading) && this.props.comments.map( comment =>
          <Fragment key={comment.id}>
            <Comment
              comment={comment}
              post={post}
            />
            <Divider inset={true} />
          </Fragment>
        )}
        {post && <NewComment post={post}/>}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (postId, option) => dispatch(votePost(postId, option)),
    deletePost: postId => dispatch(deletePost(postId)),
    changePost: (postId, post) => dispatch(changePost(postId, post)),
    fetchComments: postId => dispatch(fetchComments(postId))
  }
}

function mapStateToProps(state, props) {
  let {categoryPath = '/', postId, mode = ''} = props.match.params;
  return {
    post: getPostById(state, postId),
    postId,
    mode,
    category: getCategoryByPath(state, categoryPath),
    comments: getCommentsByPostId(state, postId),
    postLoading: isLoading(state, 'post'),
    commentLoading: isLoading(state, 'comment'),
    getUser: userName => getUserByName(state, userName)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
