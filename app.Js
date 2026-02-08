function signIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var loadingimg = document.getElementById("loadingimg");
    var signUp = document.getElementById("signUp");

    if (email == "" || password == "") {
        alert("please enter correct data");
    } else {
        const auth = firebase.auth();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(async (data) => {
                console.log(data.user.uid);
                await firebase
                    .database()
                    .ref("users")
                    .child(data.user.uid)
                    .get()
                    .then((db) => {
                        console.log(db.val());
                    });
            })
            .catch((err) => {
                alert(err.message);
            });
    }
}