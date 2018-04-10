import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PostList from './PostList';
import { getCategories, getCategoryByPath, isLoading } from '../reducers/selectors';
import AvatarMenu from './AvatarMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

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

class PostListPage extends Component {

  categoryChange(path) {
    this.props.history.push(path);
  }

  fobStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  render() {

    const {categories, category, history} = this.props;
    const categoryName = category ? category.name : '';
    const categoryPath = category ? category.path : '/';

    return (
      <div>
        <AppBar
          title="Blogger"
          iconElementLeft={<CategorySelector
            onChange={(e, i) => this.props.history.push(categories[i].path)}
            {...{categoryName, categoryPath, categories}}/>
          }
          iconElementRight={
            <AvatarMenu />
          }
        />
        {this.props.postLoading && <CircularProgress style={{margin: '30px'}} />}
        {!this.props.postLoading && <PostList {...{categoryName, categoryPath, history}} />}
        <FloatingActionButton style={this.fobStyle} onClick={() => this.props.history.push('/new-post')}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let {categoryPath = '/'} = props.match.params;
  return {
    categories: getCategories(state),
    postLoading: isLoading(state, 'post'),
    category: getCategoryByPath(state, categoryPath)
  }
}

export default connect(
  mapStateToProps,
  null
)(PostListPage);
