const functions = require('firebase-functions');
const server = require('./server');

exports.app = functions.https.onRequest(server.app);
