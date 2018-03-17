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
  user: [
    {name: 'thingone', path: '/user4.jpg'},
    {name: 'thingtwo', path: '/user2.jpg'}
  ]
}

export default initialState;
