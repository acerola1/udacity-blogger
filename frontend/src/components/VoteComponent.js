import React from 'react';
import UpVote from 'material-ui/svg-icons/action/thumb-up';
import DownVote from 'material-ui/svg-icons/action/thumb-down';
import IconButton from 'material-ui/IconButton';
import {grey600} from 'material-ui/styles/colors';

export default function VoteComponent(props) {
  return (
  <div style={props.float ? {float: 'right', marginTop: '-7px'} : {display: 'inline-block', verticalAlign: 'middle', ...props.style}}>
    <IconButton onClick={props.onUpVote} iconStyle={{width: '20px'}} style={{verticalAlign: 'sub'}} tooltip="up vote" touch={true}>
      <UpVote />
    </IconButton>
    <div style={{marginTop: '-5px', display: 'inline-block', color: grey600}}>{props.voteScore}</div>
    <IconButton onClick={props.onDownVote} iconStyle={{width: '20px'}} style={{verticalAlign: 'sub'}} tooltip="down vote" touch={true}>
      <DownVote />
    </IconButton>
  </div>
)};
