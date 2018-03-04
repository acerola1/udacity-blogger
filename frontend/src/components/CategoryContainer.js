import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import PostList from './PostList';
import { getCategories } from '../reducers/selectors';

const CategorySelector = (props) => {
  const {onItemClick} = props;
  const styles = {
    category: {
      marginTop: '6px',
      width: '170px'
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
    const {categories} = this.props;
    let categoryName = categoryId === '/' ? categories[0].name : categoryId;

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
        <PostList {...{categoryName}} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: getCategories(state)
  }
}

export default connect(
  mapStateToProps,
  null
)(CategoryContainer)
