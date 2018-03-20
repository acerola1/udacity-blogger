import React from 'react';
import { connect } from 'react-redux';
import { getCategories, getSelectedUser, createUniquePostId } from '../reducers/selectors';
import Post from './Post';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import AvatarMenu from './AvatarMenu';
import * as actions from '../actions';

function NewPostPage(props) {
  let goBack = () => {
    props.history.push('/');
  }

  let newPost = (postId, post) => {
    post.id = props.createUniquePostId(post.title);
    post.author = props.selectedUser.name;
    post.commentCount = 0;
    props.createPost(post, () => props.history.push(`/${post.category}/${post.id}`))
  }

  let post = {
    id: 'new',
    author: props.selectedUser.name,
    timestamp: Date.now(),
    category: 'react'
  }

  return (
    <div>
      <AppBar
        title="Blogger"
        iconElementLeft={
          <IconButton>
            <BackIcon onClick={(e, i) => goBack()}/>
          </IconButton>
        }
        iconElementRight={
          <AvatarMenu />
        }
      />
      <Post
        post={post}
        avatar={props.selectedUser.path}
        mode={'new'}
        onCancel={() => goBack()}
        changePost={newPost}
        categories={props.categories}
        history={props.history}
      />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (post, callback) => dispatch(actions.createPost(post, callback)),
  }
}

function mapStateToProps(state, props) {
  return {
    categories: getCategories(state).filter( cat => cat.name !== 'All'),
    selectedUser: getSelectedUser(state),
    createUniquePostId: (title) => createUniquePostId(state, title)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostPage)
