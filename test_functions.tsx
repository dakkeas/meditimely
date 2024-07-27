
// ######################### FIXES ############################

// on Home Screen, flatlist (both nearest clinics and popular clinics) 
// 1. adjust appointment view based on number of appointments 
// 2. display total number of appoinments on modal under tab
// 3. make a select time on appointment screen
// 4. add chat box feature (front-end only!)
// 5. 


import { getDatabase, ref, set } from "firebase/database";


function postAppointment(bookingObject) {
    // function writes newly created appointments to firebase
    // receives object from booked appointments containing:
    // doctor, specialization, date and time of booking, status 
    set(ref(db, ' appointments', + bookingObject.clinicId), {
        hospitalName: bookingObject.hospitalName,
        doctor: bookingObject.doctor,
        doctorSpecialization: bookingObject.doctorSpecialization,
        date: bookingObject.date,
        time: bookingObject.time,
        status: bookingObject.status,
    })
}

// set variable everytime appointment tab is altered!
const [appoinmentsToShow, setAppoinmentsToShow] = useState('PENDING')

// Flat list render for appoinment screen
<FlatList
data = {appointmentsList}
renderItem = {({item}) =>{

    <View>
        {
            item.status == appoinmentsToShow && <AppoinmentCard></AppoinmentCard>
        }
    </View>
}}
>

</FlatList>


// AUTHENTICATION FUNCTIONALITY 


// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

function emailValidation(email) {
    if (checkEmpty(email)) {
        console.error('Input is empty!')
        setErrorMessage('Email is empty')
    } else {
        if (email.toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                console.error('not an email')
                setErrorMessage('Not a valid email')
            }
        else {
            setEmail(email)
            return true
        }
    }
    return false
}

function checkEmpty(input) {
    if (input != null || input.length != 0 || input.typeof != string) {
        console.error('TextInput is empty!')
        errorMessage('Empty text field')
    } else {
        return true
    }
}

function passwordValidation(password, confirmPassword) {
    if (password.length < 6) {
        // if password is too short, throw an error!
        console.error('Password too short');
        setErrorMessage("Password has to be more than 6 letters")
    } else {

        if (confirmPassword.length == 0) {
            // if confirming password not needed
            return true
        } else {
            if (password == confirmPassword) {
                // if password does not match confirm password
                setPassword(password)
                return true
            } else {
                console.error('Passwords does not match')
                setErrorMessage('Passwords do not match')
            }
        }

    }

    return false
}

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function signinUser(email, password) {
    if (passwordValidation(password) && emailValidation(email)) {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });


    } else {
        // open a modal or something.
        // failed to signin!
    }
}
// NOTE: FORMAT THE DATE TO AN OBJECT:
const formatDate = (rawDate) => {
    let date = new Date(rawDate)

    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let day = date.getDate();

    // return `${day} ${month} ${year}`
    let dateObject = {
        year: year,
        month: month,
        day: day
    }
    return dateObject
}

// function that returns the age of the user
// function accepts a date object of the user's date of birth
function getAge(dob) {
    dateToday = new Date()

    let age = dateToday.getFullYear() - dob.year

    if (dateToday.getMonth() > dob.month) {
        age -= 1
        // minus 1 since bday hasnt passed this year
    } else if (dateToday.getMonth() == dob.month) {
        dateToday.getDate() < dob.day ? age -= 1 : null
        // if current date is more than doe
        // ex. june 25, bday: june 23
    }

    return age
}





function signUpUser(email, password, fname, lname, dob, sex) {
    if (emailValidation(email) && passwordValidation(password, "") && checkEmpty(fname) && checkEmpty(lname) && dob && sex) {
            // if (email, password) is valid, (fname, lname) is not empty, (dob , sex) is true meaning user has selected a date.
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            
            // write user credentials under their unique uid to firebase!
            // adjust database ref
            set(ref(db, 'users/' + user.uid + '/userInfo'), {
                fname: fname,
                lname: lname,
                email: email,
                last_login: Date.now()
                    
            })


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        
    } else {
        // failed to create a user based on input fields

    }

    
}



// signing out functionality

import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

// sorting by nearest clinics
// function sortByNearest(objectList) {
//     let arrayToSort = []
//     let ref = 0 
//     let run = true
//     Object.values(objectList).forEach((clinic) => {
//         if (clinic.distance > km && run) {
//             // if distance is more than ref
//             // set ref km to corresponding clinic distance
//             km = clinic.distance 
//             // add clinic to the end of array
//             arrayToSort.push(clinic)

//         } else {
//             // else if less than ref km
//             [clinic.distance].concat(arrayToSort)

//         }
        
//     })
// }
