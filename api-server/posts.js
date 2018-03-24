const clone = require('clone')

let db = {}

const defaultData = {
  "the-advantages-of-react": {
    id: 'the-advantages-of-react',
    timestamp: 1521889666403,
    title: 'The Advantages of React',
    body: '<h2><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial;">Maecenas luctus ante in</span></h2>\n<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus mollis nisl, a fermentum ipsum dapibus nec. Vestibulum sollicitudin nulla ut lacus pharetra, ac fermentum quam interdum. Aliquam placerat eu dui eu aliquam. <strong>Maecenas luctus, ante in semper finibus</strong>, eros nulla accumsan eros, eu finibus sapien ante et libero. Quisque tempus finibus porttitor. Nullam dui tellus, laoreet sit amet efficitur nec, auctor sit amet ex. Nulla sed pharetra nisi, sed lobortis nibh.</span></p>\n<h2 style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial;">Lorem ipsum dolor sit amet</span></h2>\n<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;"><em>Consectetur adipiscing elit.</em> Cras luctus neque dui, id tempor nisl cursus in. Suspendisse rhoncus tortor pulvinar, sagittis sapien et, porttitor neque. Phasellus sed porta nisi. Aliquam accumsan justo sed lorem facilisis tincidunt. Integer mollis neque et porta tristique. Fusce convallis ligula in elit viverra interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </span></p>\n<ul>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Nam eu sapien nec leo porta eleifend. </span></li>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Sed odio turpis, imperdiet fringilla nisl ullamcorper, congue malesuada felis. </span></li>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">In vitae tortor tristique lacus gravida mattis.</span></li>\n</ul>\n',
    author: 'eva',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "learn-redux-in-10-minutes": {
    id: 'learn-redux-in-10-minutes',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: '<h2><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial;">Maecenas luctus ante in</span></h2>\n<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus mollis nisl, a fermentum ipsum dapibus nec. Vestibulum sollicitudin nulla ut lacus pharetra, ac fermentum quam interdum. Aliquam placerat eu dui eu aliquam. <strong>Maecenas luctus, ante in semper finibus</strong>, eros nulla accumsan eros, eu finibus sapien ante et libero. Quisque tempus finibus porttitor. Nullam dui tellus, laoreet sit amet efficitur nec, auctor sit amet ex. Nulla sed pharetra nisi, sed lobortis nibh.</span></p>\n<h2 style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial;">Lorem ipsum dolor sit amet</span></h2>\n<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;"><em>Consectetur adipiscing elit.</em> Cras luctus neque dui, id tempor nisl cursus in. Suspendisse rhoncus tortor pulvinar, sagittis sapien et, porttitor neque. Phasellus sed porta nisi. Aliquam accumsan justo sed lorem facilisis tincidunt. Integer mollis neque et porta tristique. Fusce convallis ligula in elit viverra interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </span></p>\n<ul>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Nam eu sapien nec leo porta eleifend. </span></li>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Sed odio turpis, imperdiet fringilla nisl ullamcorper, congue malesuada felis. </span></li>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">In vitae tortor tristique lacus gravida mattis.</span></li>\n</ul>\n',
    author: 'mike',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  'react-native-the-new-holy-grail-of-mobile-development': {
    id: 'react-native-the-new-holy-grail-of-mobile-development',
    timestamp: 1521897624540,
    title: 'React Native: The new holy grail of mobile development?',
    body: '<h2><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial;">Maecenas luctus ante in</span></h2>\n<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus mollis nisl, a fermentum ipsum dapibus nec. Vestibulum sollicitudin nulla ut lacus pharetra, ac fermentum quam interdum. Aliquam placerat eu dui eu aliquam. <strong>Maecenas luctus, ante in semper finibus</strong>, eros nulla accumsan eros, eu finibus sapien ante et libero. Quisque tempus finibus porttitor. Nullam dui tellus, laoreet sit amet efficitur nec, auctor sit amet ex. Nulla sed pharetra nisi, sed lobortis nibh.</span></p>\n<h2 style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial;">Lorem ipsum dolor sit amet</span></h2>\n<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;"><em>Consectetur adipiscing elit.</em> Cras luctus neque dui, id tempor nisl cursus in. Suspendisse rhoncus tortor pulvinar, sagittis sapien et, porttitor neque. Phasellus sed porta nisi. Aliquam accumsan justo sed lorem facilisis tincidunt. Integer mollis neque et porta tristique. Fusce convallis ligula in elit viverra interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </span></p>\n<ul>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Nam eu sapien nec leo porta eleifend. </span></li>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">Sed odio turpis, imperdiet fringilla nisl ullamcorper, congue malesuada felis. </span></li>\n<li><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial;">In vitae tortor tristique lacus gravida mattis.</span></li>\n</ul>\n',
    author: 'james',
    category: 'react',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
