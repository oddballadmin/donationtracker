
const passWordDom = document.getElementById('password-1');
const confirmPassWordDom = document.getElementById('password-2');
const emailDom = document.getElementById('email');



const updateLocalStorage = (e)=>{
    console.log(e);
    localStorage.setItem('user',JSON.stringify(e));
}


document.getElementById('login-sub-button').addEventListener('click',(e)=>{
    const user = {
        email: '',
        passWord:'',
        itemsDonated:'',
        donationsNeeded: 80
    }
    if(validationUtils.isInputValid((emailDom.value),passWordDom.value)&&passWordDom.value === confirmPassWordDom.value){
        console.log(emailDom.value);
        console.log(passWordDom.value)
        user.email = validationUtils.sanitizeInput(emailDom.value);
        user.passWord = validationUtils.sanitizeInput(passWordDom.value);
        updateLocalStorage(user);
        window.alert("Account Created, please navigate back to the login screen and use the Login Screen");
    }
    e.preventDefault();

});
