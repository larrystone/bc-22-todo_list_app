'use strict';

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = '/';
  }
});

let data = [], listCount = 0;

let logout = () => {
  firebase.auth().signOut().then(() => { });
};


let load = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let currentUser = user.email.split('@')[0];
      firebase.database().ref(currentUser).once('value', snap => {
        //alert(currentUser + "\n" +snap.val());
        if (snap.val()) {
          data = snap.val();
          listCount = snap.val().length;
          loadData();
        } else {
          listCount = 0;
        }
      });
    } else {
      //alert('you have to signup or login first');
      window.location.href = '/';
    }
  });
};

let loadData = () => {
  if (listCount === 0) {
    alert('no data');
  } else {
    let mylists = document.querySelector('.mylists');

    //create lists and append
    let newlist = `<div class="list list${listCount}">
                    <input type="text" class="title" placeholder="Enter List title">
                    <div class="card card0">
                        <h2 class="cardtitle">+</h2>
                    </div>
                    <div class="card card1">
                        <h2 class="cardtitle">+</h2>
                    </div>
                </div>`;
    mylists.innerHTML = mylists.innerHTML + newlist;
  } 
};

let addNewList = () => {
  listCount++;
  loadData();
};

let save = () => {

};