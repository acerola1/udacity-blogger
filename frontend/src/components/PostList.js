import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPostsByCategory, isLoading } from '../reducers/selectors';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { darkBlack } from 'material-ui/styles/colors';
import {Card} from 'material-ui/Card';
import * as moment from 'moment';
import ClockIcon from 'material-ui/svg-icons/action/schedule';
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble';
import UserIcon from 'material-ui/svg-icons/social/person';
import { votePost, deletePost } from '../actions';
import LinearProgress from 'material-ui/LinearProgress';
import VoteComponent from './VoteComponent';
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

class PostList extends Component {
  onVote = (postId, option, event) => {
    event.stopPropagation();
    this.props.vote(postId, option);
  }

  render () {
    return (
      <div>
        <Card style={styles.card}>
          <List>
            <Subheader>{`Posts in ${this.props.categoryName} category`}</Subheader>
            {this.props.postLoading && <LinearProgress style={{margin: '15px'}} mode="indeterminate" />}
            {this.props.posts.length === 0 && !this.props.postLoading && <div style={{margin: '15px'}}>No post in this category</div>}
            {this.props.posts.map( (post, index) =>
              <Fragment key={post.id}>
                {index !==0 && <Divider inset={true} />}
                <ListItem
                  leftAvatar={<Avatar src="/User.png" />}
                  rightIconButton={moreMenu(post.id, this.props.deletePost)}
                  primaryText={post.title}
                  onClick={() => this.props.history.push(`${post.category}/${post.id}`)}
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>
                        <strong><UserIcon style={styles.icon}/>{' '+post.author}</strong>
                        {', '}<ClockIcon style={styles.icon}/>{` ${moment(+post.timestamp).fromNow()}, `}
                        <ChatIcon style={styles.icon}/>{` comments: ${post.commentCount}`}
                      </span><br />
                    </p>
                  }
                  secondaryTextLines={1}
                >
                    <VoteComponent
                      voteScore={post.voteScore}
                      onUpVote={(event) => this.onVote(post.id, 'upVote', event)}
                      onDownVote={(event) => this.onVote(post.id, 'downVote', event)}
                      float={true}
                    />
                </ListItem>
              </Fragment>
            )}
          </List>
        </Card>
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (postId, option) => dispatch(votePost(postId, option)),
    deletePost: (postId) => dispatch(deletePost(postId))
  }
}

function mapStateToProps(state, props) {
  return {
    posts: getPostsByCategory(state, props.categoryPath),
    postLoading: isLoading(state, 'post')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
