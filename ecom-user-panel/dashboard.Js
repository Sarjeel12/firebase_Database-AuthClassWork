function checkAuth() {
    var name = document.getElementById("name");
    var userimage = document.getElementById("userimage");


    var userId = localStorage.getItem("UserId");


    if (userId == undefined || userId == null) { //not user login =>access dashboard
        window.location.href = "../login.html";
    } else {
        name.innerText = localStorage.getItem("Username");
        userimage.src = localStorage.getItem("userImageUrl")
        userimage.style.width = "80px";
        userimage.style.height = "80px";
        userimage.style.borderRadius = "50%";
    }
}
checkAuth();

var CategoryList = document.getElementById("CategoryList");

async function getAllCategories() {
    await firebase.database().ref("Categories").get().then((snapdb) => {
        var data = snapdb.val();
        data = Object.values();
        for (var value of data) {
            console.log(value);
            category.innerHTML += `
                <div class="col-md-3">
                    <div class="card">
                        <img src="${value.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${value.name}</h5>
                            <p class="card-text">${value.description}</p>
                        </div>`
        }
    })
};
getAllCategories();

function logout() {
    // localStorage.removeItem("UserId")
    // localStorage.removeItem("name")

    firebase.auth().signout();

    localStorage.clear();

    window.location.href = "../login.html"
}