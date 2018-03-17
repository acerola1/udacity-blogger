const initialState = {
  category: [{
    name: "All",
    path: "/"
  }],
  post: [],
  comment: {
    comments: []
  },
  loading: {
    category: false,
    post: false,
    comment: false
  },
  user: {
    selectedUser: 'thingone',
    users: [
    {name: 'thingone', path: '/user1.jpg'},
    {name: 'thingtwo', path: '/user2.jpg'},
    {name: 'james', path: '/user3.jpg'},
    {name: 'agnes', path: '/user4.jpg'},
    {name: 'esther', path: '/user5.jpg'},
    {name: 'paul', path: '/user6.jpg'}
  ]}
}

export default initialState;
