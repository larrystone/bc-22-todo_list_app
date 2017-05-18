'use strict';

let currentUser = '',
  listCount;

//handles signout action
firebase.auth().onAuthStateChanged(user => {
  // console.log(user);
  if (user) {
    document.querySelector('#user').value = user.email.split('@')[0];
    currentUser = user.email.split('@')[0];
    firebase.database().ref(currentUser).once('value', snap => {
      if (snap.val()) {
        listCount = snap.val().length;
      } else {
        listCount = 0;
      }
    });
  } else {
    window.location.href = '/';
  }

});


$(`#signout`).click(() => {
  firebase.auth().signOut().then(() => { });
});


$(document).ready(() => {
  const createItem = (parent) => {
    $(parent).append(`<div class = 'item-wrapper'>
                            <input type ='text' class='item' placeholder ='task'>
                            <button type= 'button' class= 'btn btn-xs btn-default'>x</button>
                            <input type= 'checkbox'>
                    </div>`);

    itemRemoveButtons = $(parent).find(`button.btn-xs`);
    let removeItemButton = itemRemoveButtons[itemRemoveButtons.length - 1];
    $(removeItemButton).click(() => {
      $(removeItemButton).parent().closest('div').remove();
    });

    let item = $(parent).find('.item-wrapper').toArray().pop();
    let itemCheckbox = $(item).find(`input[type =checkbox]`)[0];

    $(itemCheckbox).click(e => {
      if (itemCheckbox.checked) {
        $(itemCheckbox.parentNode).find(`input[type = text]`)[0].style = 'text-decoration: line-through';
      } else {
        $(itemCheckbox.parentNode).find(`input[type = text]`)[0].style = 'text-decoration: none';
      }
    })
  }

  const createCard = function (parent) {
    const card = `<div class= 'card'>
                        <button type = 'button' class = 'btn btn-link btn-xs btn-remove-card card-control'><strong>remove</strong></button>
                        <button type = 'button' class = 'btn btn-link btn-xs btn-minimize-card card-control'><strong>minimize</strong></button>
                        <textarea 
                        class='card-description' 
                        maxlength = '100'
                        placeholder='description of these set of tasks'></textarea>
                        <button type='button' class = 'btn btn-link btn-xs btn-item card-control'>
                            +item
                        </button>
                 </div>` ;

    //a card contains a single single task
    parent.append(card);

    cards = parent.find('div.card');
    let lastCard = cards[cards.length - 1];

    let btnNewItem = $(lastCard).find('button.btn-item')[0];

    $(btnNewItem).click(e => {
      createItem(e.target.parentNode);
    });

    $(lastCard).click((e) => {
      $(lastCard).css({
        'width': '50%',
        'height': '70%',
        'z-index': 2,
        'overflow': 'auto',
        'box-shadow': '0 10px 20px gray, 0 21px 40px 0 gray',
        'position': 'fixed',
      });

      let width = Math.floor((innerWidth * (Number.parseInt(lastCard.style.width) / 100))),
        height = Math.floor((innerHeight * (Number.parseInt(lastCard.style.height) / 100)));

      let top = Math.floor(innerHeight / 2 - height / 2),
        left = Math.floor((innerWidth / 2 - width / 2));

      $(lastCard).css({
        'top': top,
        'left': left
      });
    });

    let minimizeButton = $(lastCard).find('.btn-minimize-card')[0];
    $(minimizeButton).click((e) => {

      $(lastCard).css({
        'width': '98%',
        'height': '18%',
        'top': '',
        'left': '',
        'z-index': 1,
        'overflow': 'hidden',
        'position': 'relative'
      });
      e.stopPropagation();
    })

    let removeButton = $(lastCard).find('.btn-remove-card')[0]

    $(removeButton).click(e => {
      $(removeButton).parent().remove();
    });
  };

  /*create a list
  *  a list can contain different cards
  */
  const createList = () => {
    listCount++;
    $(`#dashboard`).append(
      `<div id='list-${listCount}' class='list col-xs-11 col-sm-3 col-md-3 col-lg-3'>
                <button id='btnListRem-${listCount}' class='btn btnCard btn-default btn-xs'>X</button>
                <button id='btn-${listCount}' class='btn btnCard btn-primary btn-xs'> +card </button>
                <input class='list-title item' type='text' placeholder='title'>
            </div>`
    );

    let todoList = document.getElementById(`list-${listCount}`);
    let addCardButton = $(`#btn-` + listCount);

    addCardButton.on(`click`, () => {
      //console.log(todoButton.parent().closest(`div`).attr(`id`));
      let parent = addCardButton.parent().closest(`div`);
      createCard(parent);

      //the addCardButton is clicked, bind a click event to the last card;
    });

    return todoList;
  };

  $('#btnNewItem').click(() => {
    createList();
    let listRemoveButton = $(`#btnListRem-${listCount}`);

    listRemoveButton.on(`click`, () => {
      listRemoveButton.parent().closest(`div`).remove();
    })

  });

});

//console.log(currentUser);