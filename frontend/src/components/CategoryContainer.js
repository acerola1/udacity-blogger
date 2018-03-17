import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PostList from './PostList';
import { getCategories, getCategoryByPath } from '../reducers/selectors';
import AvatarMenu from './AvatarMenu';

const CategorySelector = (props) => {
  const styles = {
    category: {
      marginTop: '-3px',
      width: '140px'
    },
    categoryLabel: {
      color: 'white',
    }
  };

  return (
    <DropDownMenu
      style={styles.category}
      labelStyle={styles.categoryLabel}
      value={props.categoryPath}
      onChange={props.onChange}
    >
      {props.categories.map(category => (
        <MenuItem value={category.path} key={category.name} primaryText={category.name} />
      ))}
    </DropDownMenu>
  )};

class CategoryContainer extends Component {
	constructor(props) {
		super(props)
	}

  categoryChange(path) {
    this.props.history.push(path);
  }

  render() {

    const {categories, category, history} = this.props;
    const categoryName = category ? category.name : '';
    const categoryPath = category ? category.path : '/';

    return (
      <div>
        <AppBar
          title="Readable"
          iconElementLeft={<CategorySelector
            onChange={(e, i) => this.props.history.push(categories[i].path)}
            {...{categoryName, categoryPath, categories}}/>
          }
          iconElementRight={
            <AvatarMenu />
          }
        />
        <PostList {...{categoryName, categoryPath, history}} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let {categoryPath = '/'} = props.match.params;
  return {
    categories: getCategories(state),
    category: getCategoryByPath(state, categoryPath)
  }
}

export default connect(
  mapStateToProps,
  null
)(CategoryContainer);
