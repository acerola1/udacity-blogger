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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
  contentState = ContentState.createFromBlockArray(htmlToDraft(this.props.post.body).contentBlocks);

  state = {
    editing: this.props.mode ? true : false,
    title: this.props.post.title,
    body: this.props.post.body,
    category: this.props.post.category,
    titleError: '',
    bodyError: '',
    editorState: EditorState.createWithContent(this.contentState)
  }
  path = `/${this.props.post.category}/${this.props.post.id}`

  onEdit = id => {
    this.props.history.push(this.path + '/edit');
    let {post} = this.props;
    this.setState({editing: true, title: post.title, body: post.body});
  }

  onChange = (event, text, name) => this.setState({[name]: text})

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onOk = event => {
    if (this.isValid()) {
      let {editorState, title, category} = this.state;
      this.props.changePost(this.props.post.id, {
        title: title,
        body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        timestamp: Date.now(),
        category: category
      });
      this.props.history.push(this.path);
      this.setState({editing: false});
    }
  }

  isValid = () => {
    let {title, body} = this.state;
    if (title) {
      return true;
    }
    this.setState({titleError: !title ? 'Required' : ''});
  }

  onCancel = () => {
    this.props.history.push(this.path);
    this.props.onCancel && this.props.onCancel();
    this.setState({editing: false})
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
                style={{display: 'block', width: '100%', marginBottom: '20px'}}
                errorText={this.state.titleError}
              />
              <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: { alt: { present: true, mandatory: false } },
                }}
              />

              {this.props.mode === 'new' && <SelectField
                floatingLabelText="Category"
                value={this.state.category}
                onChange={(event, index, value) => this.onChange(event, value, 'category')}
              >
                {this.props.categories.map( cat => (
                  <MenuItem key={cat.path} value={cat.path} primaryText={cat.name} />))}
              </SelectField>
              }
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
            <FlatButton label="Cancel" onClick={this.onCancel}/>
            <FlatButton label="OK" onClick={this.onOk} />
          </CardActions>}
      </Card>
    )
  }
}

export default Post;
