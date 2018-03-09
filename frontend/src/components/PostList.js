import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPostsByCategory } from '../reducers/selectors';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, grey600} from 'material-ui/styles/colors';
import {Card} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as moment from 'moment';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import UpVote from 'material-ui/svg-icons/action/thumb-up';
import DownVote from 'material-ui/svg-icons/action/thumb-down';
import { votePost } from '../actions';

const styles = {
  card: {
    margin: '20px'
  }
}

function VoteComponent(props) {
  return (
  <div style={{float: 'right', marginTop: '-15px'}}>
    <IconButton onClick={props.onUpVote} iconStyle={{width: '20px'}} style={{verticalAlign: 'sub'}} tooltip="up vote" touch={true}>
      <UpVote color={grey600} />
    </IconButton>
    <div style={{marginTop: '-5px', display: 'inline-block', color: grey600}}>{props.voteScore}</div>
    <IconButton onClick={props.onDownVote} iconStyle={{width: '20px'}} style={{verticalAlign: 'sub'}} tooltip="down vote" touch={true}>
      <DownVote color={grey600} />
    </IconButton>
  </div>
)};

class PostList extends Component {

  iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="more"
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  rightIconMenu = (
    <IconMenu iconButtonElement={this.iconButtonElement}>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </IconMenu>
  );

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
            {this.props.posts.map( (post, index) =>
              <Fragment key={post.id}>
                {index !==0 && <Divider inset={true} />}
                <ListItem
                  leftAvatar={<Avatar src="/User.png" />}
                  rightIconButton={this.rightIconMenu}
                  primaryText={post.title}
                  onClick={() => console.log("list")}
                  secondaryText={
                    <p>
                      <span style={{color: darkBlack}}>
                        <strong>{post.author}</strong>
                        {`, ${moment(+post.timestamp).fromNow()}, comments: ${post.commentCount}`}
                      </span><br />
                      {post.body}
                    </p>
                  }
                  secondaryTextLines={2}
                >
                    <VoteComponent
                      voteScore={post.voteScore}
                      onUpVote={(event) => this.onVote(post.id, 'upVote', event)}
                      onDownVote={(event) => this.onVote(post.id, 'downVote', event)}
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
  }
}

function mapStateToProps(state, props) {
  return {
    posts: getPostsByCategory(state, props.categoryName)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
