const getListState = (cards) => {
    let cardState = {},
        listState = {},
        cardNumber = 1;
    for (let j = 0; j < cards.length; j++) {
        card = cards[j];
        if (j == 0) {
            listState[`listTitle`] = card.value;
        } else if (j > 2 ) {

            let taskDescription = $(card).find('textarea').val();
            let items = $(card.children).toArray().splice(4);
            cardState = { taskDescription };
            for (let k = 0; k < items.length; k++) {
                let item = items[k];
                let task = $(item).find('input[type = text]').val();
                let finished = $(item).find('input[type=checkbox]')[0].checked;
                cardState[`item${k + 1}`] = { task, finished }
            }

            listState[cardNumber.toString()] = cardState;
            cardNumber++;
        }

    }
    return listState;

}

const doSave = () => {
    let lists = $(`.list`);
    let list = undefined;// a single list from all todo lists
    let listsState = [],//array the states of all lists
        listState = {};//state of a single list;
    let i = 0;


    while (list = lists[i]) {
        let cards = list.children,
            card = undefined,//a single card;
            taskDescription = ``,
            isTaskCompleted = false;
        listState = getListState(cards);

        listsState.push(listState);

        listState = {};
        i++;
    }
    
    firebase.auth().onAuthStateChanged(user => {
         let currentUser = user.email.split('@')[0];
         let dbRef = firebase.database().ref();
         dbRef.child(currentUser).once('value', snap => {
             if (snap.val()) {
                 dbRef.child(currentUser).set(listsState);
             } else {
                 dbRef.child(currentUser).set(listsState);
             }
         })
 
     });
}

$(document).ready(() => {

    $(`#btnSave`).click(() => {
        doSave();
    });

});


