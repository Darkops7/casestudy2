function validate_phonenum(){
    var phonenum= document.getElementById("phone")
    var phonenum_err=document.getElementById("phone_error")
    if(phonenum.value.length<10){
        phonenum_err.style.visibility="visible"
        phonenum_err.innerText="Phone Number should be minimum 10 numbers in length."   
        return false   
    }
    else{
        phonenum_err.style.visibility="hidden"
        return true
    }
}

function validate_password(){
    var password= document.getElementById("pwd")
    var confirm_password= document.getElementById("confirmpwd")
    var password_err=document.getElementById("pwd_error")
    if(password.value!=confirm_password.value){
        password_err.style.visibility="visible"
        password_err.innerText="Passwords do not match"   
        return false   
    }
    else{
        password_err.style.visibility="hidden"
        return true
    }

}

function passwordChanged() {
    var strength = document.getElementById('progressbar');
    var strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");
    var pwd = document.getElementById("pwd");
    if (pwd.value.length < 8) {
        strength.style.backgroundColor="#353535"
        strength.style.width="100%"
        strength.innerHTML = '<span style="color:red">Minimum 8 characters required</span>';
        return false
    } else if (false == enoughRegex.test(pwd.value)) {
        strength.innerHTML = '<span style="color:white">Weak!</span>';
        strength.style.width="25%"
        strength.style.backgroundColor="red"
    } else if (strongRegex.test(pwd.value)) {
        strength.style.width="100%"
        strength.style.backgroundColor="green"
        strength.innerHTML = '<span style="color:white">Strong!</span>';
    } else if (mediumRegex.test(pwd.value)) {
        strength.style.width="75%"
        strength.style.backgroundColor="orange"
        strength.innerHTML = '<span style="color:white">Medium!</span>';
    }
}