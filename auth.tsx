



function checkEmpty(inputWord) {
    if (inputWord == null || inputWord.length == 0) {

        return true
    } else {
        
        return false
    }
}

function emailValidation(email) {
    if (email.toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        return true
    }
    return false
}



export {checkEmpty, emailValidation}