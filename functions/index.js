// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

exports.addCloudVisionTags = functions.firestore.document('photos/{imageUrl}')
  .onUpdate((change, context) => {  
   const after = change.after.data();

    if(after.imageUrl !== 'https://www.google.com/images/spin-32.gif?a'){
      console.log('a GCS image url has been created for the image')
      const db = admin.firestore();

      return db.collection('photos').doc(context.params.imageUrl)  // get imageUrl
      .get()
      .then(async doc => {
        var cloudVisionTags = [];

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Performs label detection on the image file
        const [result] = await client.labelDetection(doc.data().imageUrl);
        const labels = result.labelAnnotations;
        console.log('Labels:');
        labels.forEach(label => {
            console.log(label.description);
            cloudVisionTags.push(label.description.toLowerCase());
        });
        var allTags = [];
        allTags = cloudVisionTags.concat(doc.data().tags);
        const data = {
            autoTags: cloudVisionTags,
            combinedTags: allTags 
        };
        admin.firestore().collection('photos').doc(doc.data().id).update(data);
   })
   .then(() => console.log('function complete') )
   .catch(err => console.log(err) )
    } 
  });