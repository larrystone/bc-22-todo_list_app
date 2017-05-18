'use strict';

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = '/';
  }
});

let data = [], listCount = {};

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
          listCount['total'] = snap.val().length;
          loadData();
        } else {
          listCount['total'] = 0;
        }
      });
    } else {
      //alert('you have to signup or login first');
      window.location.href = '/';
    }
  });
};

let loadData = () => {
  if (listCount['total'] === undefined || listCount['total'] === 0) {
    let mylists = document.querySelector('.mylists');
    mylists.innerHTML = '';
  } else {
    let mylists = document.querySelector('.mylists');
    mylists.innerHTML = '';

    for (let i = 0; i < listCount['total']; i++) {
      listCount[`list${i}`] = data[i].length;
      for (let k = 0; k < listCount[`list${i}`].length; k++) {
        listCount[`list${i}card${k}`] = data[i][`$0`].length;

      }

    }

    //TODO create/update cards based off the items in list
    let myCards = `<div class="card card0">
                        <h4 class="cardtitle">*title*</h4>
                    </div>`;

    //create lists and append
    let newlist = `<div class="list list${i}">
                    <input type="text" class="title" placeholder="Enter List title">
                    <div class="cards">
                      ${myCards}
                    </div>
                    <div class="addcard">
                        <h4 class="cardtitle">+</h4>
                    </div>
                </div>`;
    mylists.innerHTML = mylists.innerHTML + newlist;

    // updateContent(listCount) {
    //   //update info from `data` content
    // }
  } 
};

let addNewList = () => {
  listCount['total']++;
  loadData();
};

let save = () => {
  let theLists = [];
  for (let i = 0; i < )


};

let updateContent = () => {

};