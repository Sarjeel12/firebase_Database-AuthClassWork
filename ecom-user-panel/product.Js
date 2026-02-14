var productNAme = URLSearchParams(window.location.search);
console.log(productNAme.get("category"));

var CategoryName = document.getElementById("catName");
CategoryName.innerText = `CategoryName`


async function getAllProducts() {
    var productName = productNAme.get("category");  
    await firebase.database().ref("Products").get().then((snapdb) => {
        console.log(snapdb.val());
        var object = Object.values(snapdb.val());
        console.log(object);
        for (var value of object) {
            // console.log(value);
            if (value.category == productNAme.get("category")) {
                CategoryName.innerText = value.category;
                // document.getElementById("productList").innerHTML += `
                // <div class="col-md-3">
                //     <div class="card">
                //         <img src="${value.imageUrl}" class="card-img-top" alt="...">
                //         <div class="card-body">
                //             <h5 class="card-title">${value.name}</h5>
                //             <p class="card-text">${value.description}</p>
                //             <p class="card-text">Price: ${value.price}</p>`
            }
        }
    })
}