import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPostsByCategory } from '../reducers/selectors';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {Card} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as moment from 'moment';

const styles = {
  card: {
    margin: '20px'
  }
}

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
      <MenuItem>Reply</MenuItem>
      <MenuItem>Forward</MenuItem>
      <MenuItem>Delete</MenuItem>
    </IconMenu>
  );

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
                  leftAvatar={<Avatar src="images/ok-128.jpg" />}
                  rightIconButton={this.rightIconMenu}
                  primaryText={post.title}
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
                />
              </Fragment>
            )}
          </List>
        </Card>
      </div>
    );
  };
}

function mapStateToProps(state, props) {
  return {
    posts: getPostsByCategory(state, props.categoryName)
  }
}

export default connect(
  mapStateToProps,
  null
)(PostList)
