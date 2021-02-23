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
var compareImageElement = document.getElementById("compare-image");
var modalMessageElement = document.getElementById("modal-message");
var userEnteredTagElement = document.getElementById("tag");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var spanCancel = document.getElementsByClassName("close-cancel")[0];

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';
// Default base64 image encoding.
var DEFAULT_IMAGE_ENCODING = '';

// Holder for tags
var userEnteredTags = [];
var photoRefId = '';
var imgEncoding = '';

// native javascript md5 algorithm.
var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}


// On load of the web app show all photos
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
  document.querySelector('#user-taglist').innerHTML = userEnteredTags;
})

// Triggered when a file is selected via the media picker.
async function onMediaFileSelected(event) {
  event.preventDefault();
  var file = event.target.files[0];
  compareImageElement.setAttribute('hidden', 'true');
  modalMessageElement.setAttribute('hidden', 'true');

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
  if (!checkSignedInWithMessage()) {
    return;
  }
  // Check if the file already exists in PhotoSource.
  var base64 = await toBase64(file);
  var md5Value = MD5(base64);
  imgEncoding = md5Value;
     firebase.firestore().collection('photos').where('imageEncoding', '==', md5Value).get()
       .then(querySnapshot => {
         if(querySnapshot.empty){
           saveImageMessage(file);
         } else {
          querySnapshot.forEach(documentSnapshot => {
            compareImageElement.src = documentSnapshot.data().imageUrl;
          });
          compareImageElement.removeAttribute('hidden');
          modalMessageElement.removeAttribute('hidden');
          saveImageMessage(file);
         }
       });
   
}

// Triggered when the user clicks the "My Photos" button.
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
}

// Triggered on window load and when the user clicks the "All Photos" button.
async function getAllPhotos() {
  console.log("getting all photos");
  // Query for 100 most recently uploaded images.  
  firebase.firestore().collection('photos').orderBy('timestamp', 'desc').limit(100).get()
  .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        var photoData = documentSnapshot.data();
        showPhoto(photoData.imageUrl);
      })
  })
}

// Triggered when a user enters a search term and clicks "Search" from the top bar.
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
}

// Appends a photo to the photo gallery section
function showPhoto(imgSrc) {
  var img = new Image();
  img.src = imgSrc;
  document.querySelector('#photos').append(img);
}

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
  firebase.firestore().collection('photos').add({
    name: getUserName(),
    email: firebase.auth().currentUser.email,
    imageUrl: LOADING_IMAGE_URL,
    imageEncoding: DEFAULT_IMAGE_ENCODING,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    tags: ["new tag", "test2", "test3"]
  }).then(function(photoRef) {
    photoRefId = photoRef.id;
    // 2 - Upload the image to Cloud Storage.
    var filePath = firebase.auth().currentUser.uid + '/' + photoRef.id + '/' + file.name;
    return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
      // 3 - Generate a public URL for the file.
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        showModal(url);
        // TODO: don't show the photo now if on the search page.
        showPhoto(url);
        // 4 - Update the file url placeholder with the image’s URL.
        return photoRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath,
          tags: userEnteredTags,
          imageEncoding: imgEncoding
        });
      });
    });
  }).catch(function(error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  });
}

// Get's the file (image) base64 encoding.
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

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

// When the user clicks on <span-cancel> (x), close the modal and do not save image
spanCancel.onclick = function() {
  modal.style.display = "none";
  console.log("Cancelling image");
  firebase.firestore().collection('photos').doc(photoRefId).delete();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function showModal(imageUrl){
  console.log("adding image tags");
  modalImageElement.src = imageUrl;
  document.querySelector('#user-taglist').innerHTML = '';
  modal.style.display = "block";
  modal.removeAttribute('hidden');
  userEnteredTags = [];
}

