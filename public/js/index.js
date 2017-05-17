'use strict';

const dbRef = firebase.database().ref();
    //handles case for unauthenticated user
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = '/dashboard';
        }
    });

let shownSignUpSection = false;

let hideShow = () => {
    if (shownSignUpSection) {
        document.querySelector('#login').style.visibility = 'visible';
        document.querySelector('#signup').style.visibility = 'hidden';
        document.querySelector('#password2').style.display = 'none';

        document.querySelector('#account_action').innerHTML = 'Create account';
        
        shownSignUpSection = !shownSignUpSection;
    } else {
        document.querySelector('#login').style.visibility = 'hidden';
        document.querySelector('#signup').style.visibility = 'visible';
        document.querySelector('#password2').style.display = 'block';
        
        document.querySelector('#email').value = '';
        document.querySelector('#password1').value = '';

        document.querySelector('#account_action').innerHTML = 'Login';

        shownSignUpSection = !shownSignUpSection;
    }
};

let logIn = () => {
    let email = document.querySelector('#email').value,
        password = document.querySelector('#password1').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        //TODO display the error using a better UI.
        alert('Wrong username or password');
    });
};

let signUp = () => {
    let email = document.querySelector('#email').value,
        password = document.querySelector('#password1').value,
        password2 = document.querySelector('#password2').value;
    
    //TODO display the error using a better UI.
    if (email.trim().length < 5) {
        alert('Invalid Email address!');
    } else if (password.length < 5) {
        alert('Password must be at least 6 characters in length');
    } else if (password !== password2) {
        alert('Password don\'t match... ');
    }else {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
            alert('Email address already in use');
        });
    }
};