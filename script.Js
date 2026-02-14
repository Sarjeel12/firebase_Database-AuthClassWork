// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";



// const firebaseConfig = {
//     apiKey: "AIzaSyCplNHmDQ-iytGBjJMhzLLkGVJfZf1tCiM",
//     authDomain: "ecom-classwrk.firebaseapp.com",
//     projectId: "ecom-classwrk",
//     storageBucket: "ecom-classwrk.firebasestorage.app",
//     messagingSenderId: "971597633294",
//     appId: "1:971597633294:web:d0aa21ec65e67186b7a95f"
// };

//  const app = initializeApp(firebaseConfig);

//  console.log(app);

const db = firebase.database();
var loadingimg = document.getElementById("loadingimg");
var submit = document.getElementById("signIn");
var showImage = document.getElementById("showImage");
var body = document.getElementsByTagName("body")[0];
var googleLogin = document.getElementById("googleLogin");
var userImage = document.getElementById("userImage");
var userImageUrl = "";

googleLogin.addEventListener("click", async function () {
    var provider = firebase.auth();
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    await firebase.auth()
        .signInWithPopup(googleProvider)
        .then(async (resp) => {
            console.log(resp.user.displayName);
            console.log(resp.user.photoURL);
            console.log(resp.user.uid);
            console.log(resp.user.phoneNumber);

            var object = {
                email: resp.user.email,
                name: resp.user.displayName,
                uid: resp.user.uid,
                number: "",
                userImageUrl: resp.user.photoURL,
            };
            console.log(object);

            await firebase.database().ref("Users").child(resp.user.uid).set(object);
            alert("Login successfully");
            localStorage.setItem("UserId", true)
            localStorage.setItem("UserId", resp.user.email)
            localStorage.setItem("UserId", resp.user.uid)
            window.location.href = "./ecom-user-panel/dashboard.html"

        })
        .catch((e) => {
            console.log(e);
        });
});

var checkLast = "";

changeBg.addEventListener("click", function () {
    var bgcolor = ["red", "blue", "green", "yellow", "pink", "purple", "orange", "cyan", "magenta"];

    var checkStatus = false;
    console.log("match number", checkLast, randomNumber);
    while (checkStatus == randomNumber) {
        var randomNumber = (Math.random() * 6).toFixed();
        if (checkLast != randomNumber) {
            2 == 2;
            console.log("match number", checkLast, randomNumber);

        } else {
            checklast = randomNumber;
            checkStatus = true;
        }
    }
    var checkUser = false;
    console.log(checkLast);
    body.style.backgroundColor = bgcolor[checklast];
    localStorage.setItem("setTheme", bgcolor[checklast]);
});

var userProfileUrl = "";

userImage.addEventListener("change", function () {
    console.log(userImage.files.length);
    if (userImage.files.length > 0) {
        showImage.src = URL.createObjectURL(userImage.files[0]);
        console.log(showImage.src);
        showImage.setAttribute("class", "img");
    } else {
        showImage.src = "";
        showImage.removeAttribute("class");
    }
});

async function uploadImage() {
    // console.log(userImage.files[0]);

    console.log(userImage.files[0]);

    var checkSize = userImage.files[0].size / 1024 / 1024;
    // console.log(checkSize);
    if (checkSize > 2) {
        alert("please select image less then 2 mb");
    } else {
        const formdata = new FormData();
        formdata.append("file", userImage.files[0]);
        formdata.append("upload_preset", "CLASS_3_5_STORAGE");

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        await fetch(
            "https://api.cloudinary.com/v1_1/dgbkoycyp/image/upload",
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.secure_url);
                userImageUrl = data.secure_url;
                return userImageUrl;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
        return userImageUrl;
    }
};

function ImageSizeCheck() {
    if (userImage.files[0] == null) {
        alert("please select image");
        return false;
    } else {
        var size = userImage.files[0].size / 1024 / 1024; // size mb

        if (size > 2) {
            alert("select image less then 2 mb");
            return false;
        } else {
            return true;
        }
    }
};


async function signUp() {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var contactNo = document.getElementById("contactNo").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;

    const auth = firebase.auth();

    var loadingimg = document.getElementById("loadingimg");
    var signUp = document.getElementById("signUp");

    //   password = "ashfjhasjfh"
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (email == "" || password == "") {
        alert("enter your Email or Password");
    } else if (email.toString().includes("@") != true) {
        alert("please enter corret email");
    } else if (password.length < 8) {
        alert("please enter password must be greater then 8 letter ");
    } else if (passwordRegex.test(password) == false) {
        alert("please enter strong password");
    } else {
        loadingimg.style.display = "inline";
        signUp.style.display = "none";
        const auth = firebase.auth();
        const db = firebase.database();

        // var uploadImage = await uploadImage();

        await auth
            .createUserWithEmailAndPassword(email, password)
            .then(async (userData) => {
                var user = userData;
                console.log(userData.user.uid);
                loadingimg.style.display = "none";
                signUp.style.display = "inline";

                var userImageUrl = await uploadImage();

                var userObject = {
                    name: name,
                    email: email,
                    password: password,
                    age: age,
                    contactNo: contactNo,
                    userImageUrl: userImageUrl,

                };
                // console.log(userObject);

                await db.ref("users").child(userData.user.uid).set(userObject);

                window.location.href = "./login.html";
            })
            .catch((error) => {
                loadingimg.style.display = "none";
                submit.style.display = "inline";
                var errorCode = error.code; //200,201,404,401
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
}

function checkUser() {
    var userLogin = localStorage.getItem("userLogin");
    if (userLogin == "true") {
        window.location.href = "./user dashboard/index.html";
    }
}

checkUser();

