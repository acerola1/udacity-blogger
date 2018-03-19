import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPostsByCategory, getUserByName } from '../reducers/selectors';
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
import MoreMenu from './MoreMenu';
import SortingSelection from './SortingSelection';

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
          <List style={{position: 'relative'}}>
            <Subheader>{`Posts in ${this.props.categoryName} category`}</Subheader>
            <SortingSelection style={{position: 'absolute', right: '10px', top: '1px'}} />
            {this.props.posts.length === 0 && !this.props.postLoading && <div style={{margin: '15px'}}>No post in this category</div>}
            {this.props.posts.map( (post, index) =>
              <Fragment key={post.id}>
                {index !==0 && <Divider inset={true} />}
                <ListItem
                  leftAvatar={<Avatar src={this.props.getUser(post.author).path} />}
                  rightIconButton={<MoreMenu
                    id={post.id}
                    onDelete={this.props.deletePost}
                    onEdit={(id) => this.props.history.push(`${post.category}/${id}/edit`)}
                    />
                  }
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
    getUser: userName => getUserByName(state, userName)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
