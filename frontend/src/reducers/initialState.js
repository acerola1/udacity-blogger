import * as cons from '../utils/constants'

const initialState = {
  category: [{
    name: "All",
    path: "/"
  }],
  post: [],
  comment: {
    comments: []
  },
  setting: {
    sorting: cons.TIME_DESC,
    loading: {
      category: false,
      post: false,
      comment: false
    }
  },
  user: {
    selectedUser: cons.DEFAULT_USER,
    users: [
      {name: 'mike', path: '/user1.jpg'},
      {name: 'eva', path: '/user2.jpg'},
      {name: 'james', path: '/user3.jpg'},
      {name: 'agnes', path: '/user4.jpg'},
      {name: 'esther', path: '/user5.jpg'},
      {name: 'paul', path: '/user6.jpg'}
  ]},
  error: {
    message: '',
    open: false,
  }
}

export default initialState;
