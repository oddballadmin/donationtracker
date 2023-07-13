const emailDom = document.getElementById('sign-in-email');
const pWordDom = document.getElementById('sign-in-password');

document.getElementById('sub-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    let isEmailMatching,isPasswordMatching;
    if (user) {
        if (validationUtils.sanitizeInput(emailDom.value) === user.email) {
            console.log('emails match');
            isEmailMatching = true;
        }
        else{
            isEmailMatching = false;

        }
        if (pWordDom.value === user.passWord) {
            console.log('passwords match');
            isPasswordMatching = true;
        }
        else{
            isPasswordMatching = false;
        }
        if(isPasswordMatching&&isEmailMatching){
            window.alert("Successfully logged in!!");
        }
        else{
            console.log("not logged in")
        }
    }
});
