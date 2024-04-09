// Your solution goes here 
function isStrongPassword(password) {
    if (password.length < 8 || password.toLowerCase() === password || password.indexOf("password") != -1){
        return false;
    }
    return true;
}

