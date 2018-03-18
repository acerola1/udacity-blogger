import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import * as moment from 'moment';
import VoteComponent from './VoteComponent';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ClockIcon from 'material-ui/svg-icons/action/schedule';
import UserIcon from 'material-ui/svg-icons/social/person';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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

class Post extends Component {
  state = {
    editing: false,
    title: '',
    body: ''
  }

  onEdit = id => {
    let {post} = this.props;
    this.setState({editing: true, title: post.title, body: post.body});
  }

  onChange = (event, text, name) => this.setState({[name]: text})

  onOk = event => {
    this.props.changePost(this.props.post.id, {
      title: this.state.title,
      body: this.state.body,
      timestamp: Date.now()
    });
    this.setState({editing: false});
  }

  render() {
    let {post} = this.props;
    return (
      <Card style={styles.card}>
        <CardHeader
          title={<span><UserIcon style={styles.icon}/>{` ${post.author}`}</span>}
          subtitle={<span><ClockIcon style={styles.icon}/>{` ${moment(+post.timestamp).fromNow()}`}</span>}
          avatar={this.props.avatar}
          style={{paddingBottom: 0}}
        />
        {!this.state.editing && <CardTitle title={post.title} />}
        <CardText style={{paddingTop: 0, whiteSpace:'pre-wrap'}}>
          {!this.state.editing && post.body}
          {this.state.editing &&
            <div>
              <TextField floatingLabelText={'Title'}
                id={post.id+'_title'}
                onChange={(event, text) => this.onChange(event, text, 'title')}
                value={this.state.title}
                style={{display: 'block', width: '100%'}}
              />
              <TextField floatingLabelText={'Body'}
                id={post.id+'_body'}
                multiLine={true}
                onChange={(event, text) => this.onChange(event, text, 'body')}
                value={this.state.body}
                style={{display: 'block', width: '100%'}}
              />
            </div>
          }
        </CardText>
        {!this.state.editing &&
          <CardActions>
            <VoteComponent
              voteScore={post.voteScore}
              onUpVote={(event) => this.props.onVotePost(post.id, 'upVote', event)}
              onDownVote={(event) => this.props.onVotePost(post.id, 'downVote', event)}
              float={false}
            />
            <FlatButton label="Edit" onClick={this.onEdit} icon={<EditIcon />} />
            <FlatButton label="Delete" onClick={() => this.props.onDelete(post.id)} icon={<DeleteIcon />} />
          </CardActions>}
        {this.state.editing &&
          <CardActions>
            <FlatButton label="Cancel" onClick={() => {this.setState({editing: false})}}/>
            <FlatButton label="OK" onClick={this.onOk} />
          </CardActions>}
      </Card>
    )
  }
}

export default Post;