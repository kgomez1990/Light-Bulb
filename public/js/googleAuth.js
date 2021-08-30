var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // In practice, your app can retrieve one or more discovery documents.
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  gapi.client.init({
      'apiKey': 'AIzaSyBVCzYwvjlv-4dveeESltJLzfXtCQZLEiA',
      'clientId': '598136361769-smakijbmbfnqe5v5k7rrbi02qvdf457j.apps.googleusercontent.com',
      'discoveryDocs': [discoveryUrl],
      //Should scope be 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
      'scope': 'email profile openid'
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    $('#sign-in-or-out-button').click(function() {
      handleAuthClick();
    });
    $('#revoke-access-button').click(function() {
      revokeAccess();
    });
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked "Sign out" button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus() {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    $('#sign-in-or-out-button').html('Sign out');
    $('#revoke-access-button').css('display', 'inline-block');
    $('#auth-status').html('You are currently signed in and have granted ' +
        'access to this app.');
  } else {
    $('#sign-in-or-out-button').html('Sign In/Authorize');
    $('#revoke-access-button').css('display', 'none');
    $('#auth-status').html('You have not authorized this app or you are ' +
        'signed out.');
  }
}

function updateSigninStatus() {
  setSigninStatus();
}

/*
Step 4: Handle the OAuth 2.0 server response
JS Client Library
The JavaScript client library handles the response from Google's authorization server. If you set a listener to monitor changes in the current user's sign-in state, 
that function is called when the user grants the requested access to the application.
*/

/* This would go in the html.  I think we could leave out the revoke access button.

<button id="sign-in-or-out-button"
      style="margin-left: 25px">Sign In/Authorize</button>
<button id="revoke-access-button"
      style="display: none; margin-left: 25px">Revoke access</button>

<div id="auth-status" style="display: inline; padding-left: 25px"></div><hr>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">

*/