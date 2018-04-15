

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
* FireBase hosting added. Client side as a static html. Server side as a node.js cloud function.

# Installation
After cloning the project. Make sure node.js and npm are installed. I'm using node v.9.6.1 and npm 5.6.0.

**Backend**

There is a Firebase dependency on the backend. So you either install Firebase globally with:
```
npm i -g firebase-tools
```
or you can remove "firebase-admin" and "firebase-functions" from /functions/package.json. In this case the Firebase deploy otion will not work of course.
The backend can be started:

```
>cd functions
>npm i
>npm start
```
**Frontend**
```
>cd frontend
>npm i
>npm start
```

**Deploying to Firebase**

Create a new project on Firebase. Update .firebaserc with your new project ID.
```
"default": "<YOUR POJECT ID>"
```
Create a build in frontend with:
```
npm run build
```
You can start a local emulation or you can deploy the project now. After logging in on Firebase.
```
emulation:
firebase serve --only functions,hosting

deploy:
firebase deploy
```

**Known limitation with Firebase:** 

* There is no proper database in the backend, only in memory storage. So you can try the app with the default dataset and you can modify it, but all modification will be erased within a couple hours.

**Online demo**

Hosted on Firebase: [https://udacity-blogger-2eb6a.firebaseapp.com/](https://udacity-blogger-2eb6a.firebaseapp.com/) 