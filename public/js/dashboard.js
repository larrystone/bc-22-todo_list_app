'use strict';

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = '/';
  }
});

let logout = () => {
  firebase.auth().signOut().then(() => { });
};


