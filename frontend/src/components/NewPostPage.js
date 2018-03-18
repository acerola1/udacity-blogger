import React from 'react';
import { connect } from 'react-redux';
import { getCategories, getSelectedUser } from '../reducers/selectors';
import Post from './Post';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import AvatarMenu from './AvatarMenu';
import uuid from 'uuid';
import * as actions from '../actions';

function NewPostPage(props) {
  let goBack = () => {
    props.history.push('/');
  }

  let newPost = (postId, post) => {
    post.id = uuid();
    post.author = props.selectedUser.name;
    post.commentCount = 0;
    post.category='react';
    props.createPost(post, () => props.history.push(`/${post.category}/${post.id}`))

    console.log(post)
  }

  let post = {
    id: 'new',
    author: props.selectedUser.name,
    timestamp: Date.now()
  }

  return (
    <div>
      <AppBar
        title="Readable"
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
        editMode={true}
        onCancel={() => goBack()}
        changePost={newPost}
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
    categories: getCategories(state),
    selectedUser: getSelectedUser(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostPage)
