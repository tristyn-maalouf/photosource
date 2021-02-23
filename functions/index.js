// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');

// Adds a message that welcomes new users into the chat.
exports.testFunction = functions.storage.object().onFinalize(async (photoObject) => {
    console.log('function worked!');
});