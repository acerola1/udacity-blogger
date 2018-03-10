import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { getPostById, getCategoryByPath, isLoading } from '../reducers/selectors';

class PostContainer extends Component {
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
{this.props.postLoading || this.props.post.title}


      </div>
    )
  }
}

function mapStateToProps(state, props) {
  let {categoryPath = '/', postId} = props.match.params;
  return {
    post: getPostById(state, postId),
    category: getCategoryByPath(state, categoryPath),
    postLoading: isLoading(state, 'post')
  }
}

export default connect(
  mapStateToProps,
  null
)(PostContainer);
