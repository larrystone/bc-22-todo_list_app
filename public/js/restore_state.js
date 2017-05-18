
//todo clean up code(wrap repetitions; model shared behaviors into objects)
const createCard = (cardState, parent) => {
    let currentCard;
    if (typeof (cardState) == 'object') {
        let description = cardState.taskDescription

        parent.append(`<div class= 'card'>
                        <button type = 'button' class = 'btn btn-link btn-xs btn-remove-card card-control'><strong>remove</strong></button>
                        <button type = 'button' class = 'btn btn-link btn-xs btn-minimize-card card-control'><strong>minimize</strong></button>
                        <textarea 
                        class='card-description' 
                        maxlength = '100'
                        placeholder='description of these set of tasks'>${description}</textarea>
                        <button type='button' class = 'btn btn-link btn-xs btn-item card-control'>
                            +item
                        </button>
                 </div>`);

        let cards = parent.find('div.card').toArray();
        currentCard = cards.pop();
        for (let i = 1; cardState.hasOwnProperty(`item${i}`); i++) {
            let item = cardState[`item${i}`];
            let checkbox = `<input type = checkbox>`;
            if (item.finished) {
                checkbox = `<input type = 'checkbox' checked>`
            }

            $(currentCard).append(`<div class = 'item-wrapper'>
                            <input type ='text' class='item' placeholder = 'task' value = '${item.task}'>
                            <button type= 'button' class= 'btn btn-xs btn-default'>x</button>
                            ${checkbox}
                    </div>`)

            itemRemoveButtons = $(currentCard).find(`button.btn-xs`);
            let removeItemButton = itemRemoveButtons[itemRemoveButtons.length - 1];
            $(removeItemButton).click(() => {
                $(removeItemButton).parent().closest('div').remove();
            })

            let itemWrapper = $(currentCard).find('.item-wrapper').toArray().pop();
            let itemCheckbox = $(itemWrapper).find(`input[type =checkbox]`)[0];
            if (itemCheckbox.checked) {
                $(itemCheckbox.parentNode).find(`input[type = text]`)[0].style = 'text-decoration: line-through';
            } else {
                $(itemCheckbox.parentNode).find(`input[type = text]`)[0].style = 'text-decoration: none';
            }
            $(itemCheckbox).click(e => {
                if (itemCheckbox.checked) {
                    console.log($(itemCheckbox.parentNode).find(`input[type = text]`)[0])
                    $(itemCheckbox.parentNode).find(`input[type = text]`)[0].style = 'text-decoration: line-through';
                    console.log('lined through');
                } else {
                    $(itemCheckbox.parentNode).find(`input[type = text]`)[0].style = 'text-decoration: none';
                }
            })

        }

    } else {
        parent.append(`<div class= 'card' style = 'color: white;'>
                        <button type = 'button' class = 'btn btn-link btn-xs btn-remove-card'><strong>remove</strong></button>
                        <button type = 'button' class = 'btn btn-link btn-xs btn-minimize-card'><strong>minimize</strong></button>
                        <textarea 
                        class='card-description' 
                        maxlength = '100'
                        placeholder='description of these set of tasks'></textarea>
                        <button type='button' class = 'btn btn-link btn-xs btn-item'>
                            +item
                        </button>
                 </div>`);
    }





    cards = parent.find('div.card');
    let lastCard = cards[cards.length - 1];


    let btnNewItem = $(lastCard).find('button.btn-item')[0];

    $(lastCard).click((e) => {
        $(lastCard).css({
            'width': '50%',
            'height': '70%',
            'z-index': 2,
            'box-shadow': '0 10px 20px gray, 0 21px 40px 0 gray',
            'overflow': 'auto',
            'position': 'fixed'
        });

        let width = Math.floor((innerWidth * (Number.parseInt(lastCard.style.width) / 100))),
            height = Math.floor((innerHeight * (Number.parseInt(lastCard.style.height) / 100)));

        let top = Math.floor(innerHeight / 2 - height / 2),
            left = Math.floor((innerWidth / 2 - width / 2));

        $(lastCard).css({
            'top': top,
            'left': left
        })
    });



    let minimizeButton = $(lastCard).find('.btn-minimize-card')[0];
    $(minimizeButton).click((e) => {


        $(lastCard).css({
            'width': '96%',
            'height': '18%',
            'top': '',
            'left': '',
            'z-index': 1,
            'overflow': 'hidden',
            'box-shadow': 'none',
            'position': 'relative'

        });
        e.stopPropagation();
    })

    let removeButton = $(lastCard).find('.btn-remove-card')[0]

    $(removeButton).click(e => {
        $(removeButton).parent().remove();
    })


    $(btnNewItem).click(e => {
        $(e.target.parentNode).append(`<div>
                            <input type ='text' class='item' placeholder ='task'>
                            <button type= 'button' class= 'btn btn-xs btn-default'>x</button>
                            <input type= 'checkbox'>
                    </div>`);

        itemRemoveButtons = $(e.target.parentNode).find(`button.btn-xs`);
        let removeItemButton = itemRemoveButtons[itemRemoveButtons.length - 1];
        $(removeItemButton).click(() => {
            $(removeItemButton).parent().closest('div').remove();
        })
    });


}


const createList = (listCount, title) => {
    let list = `<div id='list-${listCount}' class='list col-xs-11 col-sm-3 col-md-3 col-lg-3'>
                    <button id='btnListRem-${listCount}' class='btn btnCard btn-default btn-xs'>X</button>
                    <button id='btn-card-add-${listCount}' class='btn btnCard btn-primary btn-xs'>+card </button>
                    <input class='list-title item' type='text' placeholder='title' value= '${title}'>
                </div>`;

    $('#dashboard').append(list);

    //remov
    $(`#btnListRem-${listCount}`).click(e => {
        e.target.parentNode.remove();
    })

    $(`#btn-card-add-${listCount}`).click(e => {
        console.log(`clicked`);
        createCard(undefined, $(e.target.parentNode));
    })
}


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        let currentUser = user.email.split(`@`)[0];
        userRef = firebase.database().ref(currentUser);
        userRef.once(`value`, snap => {
            if (snap.val()) {
                appState = snap.val();
                appState.reverse();
                itemsCount = appState.length - 1;
                for (let i = itemsCount; i >= 0; i--) {
                    let listState = appState[i],
                        listTitle = listState.listTitle;


                    createList(i, listTitle);

                    $(`#btn-add-card-${listCount}`).click(e => {
                        createCard(undefined, e.target.parentNode);
                    })
                    //let cardNumber = String(j);
                    for (let j = 1; listState.hasOwnProperty(String(j)); j++) {

                        cardNumber = String(j);

                        let card = createCard(listState[cardNumber], $(`#list-${i}`));
                    }
                }

            }
        });
    }
});
