'use strict';

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

let login = () => {
    
};

let signUp = () => {

};