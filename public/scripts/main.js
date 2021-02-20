'use strict';

// Shortcuts to DOM elements
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var imageFormElement = document.getElementById('image-form');
var imageButtonElement = document.getElementById('upload-photo');
var myPhotosButtonElement = document.getElementById('my-photos');
var allPhotosButtonElement = document.getElementById('all-photos');
var searchButtonElement = document.getElementById("search-button");
var addTagElement = document.getElementById("add-tag-button");
var mediaCaptureElement = document.getElementById('mediaCapture');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');
var modal = document.getElementById("myModal");
var modalImageElement = document.getElementById("modal-image");
var userEnteredTagElement = document.getElementById("tag");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Holder for tags
var userEnteredTags = [];
var photoRefId = '';

document.addEventListener("DOMContentLoaded", function(){
  getAllPhotos();
});

// -------------- VERIFY FIREBASE SETUP --------------

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK.');
    }
}
  
// Checks that Firebase has been imported.
checkSetup();

// -------------- AUTH FUNCTIONS --------------

// Initiate Firebase Auth.
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}

initFirebaseAuth();

// Frontend event listeners.
signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);

// Signs-in using google.
function signIn() {
  // Sign into Firebase using popup auth & Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// Signs-out the currently signed-in user.
function signOut() {
  // Sign out of Firebase.
  firebase.auth().signOut();
}

// Returns the signed-in user's profile pic URL.
function getProfilePicUrl() {
  console.log("profile pic url: " + firebase.auth().currentUser.photoURL);
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) { // User is signed in!
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();
  
      // Set the user's profile pic and name.
      userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
      userNameElement.textContent = userName;
  
      // Show user's profile and sign-out button.
      userNameElement.removeAttribute('hidden');
      userPicElement.removeAttribute('hidden');
      signOutButtonElement.removeAttribute('hidden');
  
      // Hide sign-in button.
      signInButtonElement.setAttribute('hidden', 'true');
    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      console.log("user signed out");
      userNameElement.setAttribute('hidden', 'true');
      userPicElement.setAttribute('hidden', 'true');
      signOutButtonElement.setAttribute('hidden', 'true');
  
      // Show sign-in button.
      signInButtonElement.removeAttribute('hidden');
    }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (isUserSignedIn()) {
      return true;
    }
  
    // Display a message to the user using a Toast.
    var data = {
      message: 'You must sign-in first',
      timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return false;
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
}

// ---------- IMAGE FUNCTIONS ------------
// Upload Image button.
imageButtonElement.addEventListener('click', function(e) {
  e.preventDefault();
  mediaCaptureElement.click();
});
mediaCaptureElement.addEventListener('change', onMediaFileSelected);

// My Photos button.
myPhotosButtonElement.addEventListener('click', function(e) {
  if(checkSignedInWithMessage()){
    document.querySelector('#photos').innerHTML = '';
    getUsersPhotos();
  } 
})

// All Photos button.
allPhotosButtonElement.addEventListener('click', function(e) {
  document.querySelector('#photos').innerHTML = '';
  getAllPhotos();
})

// Photo Search.
searchButtonElement.addEventListener('click', function(e) {
  document.querySelector('#photos').innerHTML = '';
  getRelevantPhotos();
})

// Add Tag.
addTagElement.addEventListener('click', function(e) {
  console.log('adding tag ' + document.querySelector('#tag').value);
  // add tag to the tags list
  userEnteredTags.push(document.querySelector('#tag').value);
  // clear the input box
  document.querySelector('#tag').value = '';
})

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
  event.preventDefault();
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  imageFormElement.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    var data = {
      message: 'You can only share images',
      timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return;
  }
  // Check if the user is signed-in
  if (checkSignedInWithMessage()) {
    console.log("saving new photo with tags");
    saveImageMessage(file);
  }
}

// TODO
function getUsersPhotos() {
  console.log("getting user's photos");
  // query for all photos where email = firebase.auth().currentUser.email
  firebase.firestore().collection('photos').where('email', '==', firebase.auth().currentUser.email).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.data());
        showPhoto(documentSnapshot.data().imageUrl);
      });
    });
  // showPhotos(queryResult);
}

// TODO
async function getAllPhotos() {
  console.log("getting all photos");
  // query for all photos 
  var query = firebase.firestore().collection('photos').orderBy('timestamp', 'desc').limit(100);
  // Start listening to the query.
  await query.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      var photoData = change.doc.data();
      showPhoto(photoData.imageUrl);
    });
  });
}

// TODO
function getRelevantPhotos() {
  console.log("getting relevant photos");
  var searchString = document.querySelector('#search-string').value;
  firebase.firestore().collection('photos').where('tags', 'array-contains', searchString).get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.data());
        showPhoto(documentSnapshot.data().imageUrl);
      });
    });
  
  // TODO
  // showPhotos(queryResult);
}

// Appends a photo to the photo gallery section
function showPhoto(imgSrc) {
  console.log("showing a photo");
  var img = new Image();
  img.src = imgSrc;
  document.querySelector('#photos').append(img);
}

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// TODO: Generate tags before saving the photo
// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
  firebase.firestore().collection('photos').add({
    name: getUserName(),
    email: firebase.auth().currentUser.email,
    imageUrl: LOADING_IMAGE_URL,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    tags: ["new tag", "test2", "test3"]
  }).then(function(photoRef) {
    photoRefId = photoRef.id;
    // 2 - Upload the image to Cloud Storage.
    var filePath = firebase.auth().currentUser.uid + '/' + photoRef.id + '/' + file.name;
    return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
      // 3 - Generate a public URL for the file.
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        addImageTags(url);
        // 4 - Update the file url placeholder with the image’s URL.
        return photoRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath,
          tags: userEnteredTags
        });
      });
    });
  }).catch(function(error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  });
}

// MODAL
// When the user clicks on <span> (x), close the modal and save tags
span.onclick = function() {
  modal.style.display = "none";
  console.log("Tags " + userEnteredTags + " added to the image");
  const data = {
    tags: userEnteredTags
  };
  firebase.firestore().collection('photos').doc(photoRefId).update(data);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function addImageTags(imageUrl){
  console.log("adding image tags");
  //modalImageElement.src = imageUrl;
  modal.style.display = "block";
  modal.removeAttribute('hidden');
  userEnteredTags = [];
}