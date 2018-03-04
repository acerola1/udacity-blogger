import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
//import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';

const CategorySelector = (props) => {
  const {onItemClick} = props;
  const styles = {
    category: {
      marginTop: '6px'
    },
    categoryLabel: {
      color: 'white',
      fontSize: '24px'
    },
    icon: {
      color: 'white'
    }
  };
  return (
    <IconMenu
      {...{onItemClick}}
      iconButtonElement={
        <FlatButton
          label={props.categoryName}
          labelStyle={styles.categoryLabel}
          style={styles.category}
          labelPosition="before"
          icon={<ExpandMore color="white"/>}
        />
      }
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      {props.categories.map(category => (
        <MenuItem key={category.name} value={category.path} primaryText={category.name.toUpperCase()} />
      ))}
    </IconMenu>
)};

class CategoryContainer extends Component {
	constructor(props) {
		super(props)
	}

  categoryChange(path) {
    this.props.history.push(path);
  }

  render() {
    let {categoryId = '/'} = this.props.match.params;
    let categoryName = categoryId === '/' ? 'All' : categoryId;
    const {categories} = this.props;

    return (
      <div>
        <AppBar
          title="Readable"
          titleStyle={{textAlign: "center"}}
          iconElementLeft={<CategorySelector
            onItemClick={(event, item) => this.props.history.push(item.props.value)}
            {...{categoryName, categories}}/>
          }
        />
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
)(CategoryContainer)
