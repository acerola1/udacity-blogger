

**This is the second assignment for the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) program.**

For this React/Redux assignment only the backend api and the specification was provided.

---
# Blogger aka Readable 

>This is a blog like web application. You can make new posts and comments. You can also edit/delete the posts and comments and change the score of them. This project do not include authentication. You can change any user's posts.

Built with React, Redux and React Router. With a [provided](https://github.com/udacity/reactnd-project-readable-starter) Node.js backend api.

Screenshot:
>![Screenshot](/Screenshot.png?raw=true "Title")

# Features

I enjoyed making this project. I have to decide in some implementation details. 
* this is my first time using [Material ui](http://www.material-ui.com).
* added a [Wysiwyg](https://github.com/jpuri/react-draft-wysiwyg) editor so the posts became more bloglike
* ids of posts generated from their title to make them SEO friendly
* implemented a fake user account module to be able to use different avatars
* added some default posts with formatting

# Installation
After cloning the project. Make sure node.js and npm are installed. I'm using node v.9.6.1 and npm 5.6.0.

**Backend**
```
>cd api-server
>npm i
>npm start
```
**Frontend**
```
>cd frontend
>npm i
>npm start
```