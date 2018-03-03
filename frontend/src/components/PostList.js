import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { connect } from 'react-redux';

const styles = {
  radioButton: {
    display: 'inline-block',
    width: 'auto',
    marginLeft: '10px'
  },
  icon: {
    marginRight: '5px'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};

class PostList extends Component {
	constructor(props) {
		super(props)
	}

  categoryChange(path) {
    this.props.history.push(path);
  }

  render() {
    let {categoryId = ''} = this.props.match.params;
/*    if (categoryId != 'category') {
      this.props.history.push('/not_found');
    }*/
    return (
      <div>
        Categories:
        <RadioButtonGroup
          onChange={(e, value) => this.categoryChange(value)}
          name="shipSpeed"
          defaultSelected="/"
          style={styles.buttonGroup}
        >
          {this.props.categories.map( category => {
            return (<RadioButton
              key={category.name}
              value={category.path}
              label={category.name}
              style={styles.radioButton}
              iconStyle={styles.icon}
            />)
          })}
        </RadioButtonGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category
  }
}

export default connect(
  mapStateToProps,
  null
)(PostList)
