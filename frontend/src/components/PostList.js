import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class PostList extends Component {
	constructor(props) {
		super(props)
	}

  render() {
    let {categoryId = ''} = this.props.match.params;
/*    if (categoryId != 'category') {
      this.props.history.push('/not_found');
    }*/
    return (
      <div>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          <RadioButton
            value="all"
            label="All"
            style={styles.radioButton}
          />
          <RadioButton
            value="react"
            label="React"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  }
}

export default PostList;
