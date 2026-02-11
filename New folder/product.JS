document.getElementById('sidebar-container').innerHTML = getSidebar();
var modal = document.getElementById("modal");
var editModal = document.getElementById("editModal");

var file = document.getElementById("file");
var editFile = document.getElementById("editFile");

var imageShow = document.getElementById("imageShow");
var editImageShow = document.getElementById("editImageShow");

var table_body = document.getElementById("table-body");
var editproductCat = document.getElementById("editprod-cat");
var ProductImageUrl = "";

var selectedkey = ""; // for edit button set only for run time


var productName = document.getElementById("prod-name");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("prod-price");

async function addProduct() {
  event.preventDefault();
  console.log(productName.value, productCategory.value, productPrice.value);

  var imageCheck = await uploadImage();

  console.log(imageCheck);
  if (imageCheck == true) {
    var ProductKey = await firebase.database().ref("PRODUCT").push().getkey();
    var object = {
      prodName: productName.value,
      prodCat: productCategory.value,
      prodPrice: productPrice.value,
      prodImage: userImageUrl,
    };
    console.log(object);

    await firebase.database().ref(PRODUCT).child(ProductKey).set(object);
    alert("Add New product");

    // getAllProduct();
    closeModal();
    window.location.reload();
  }
}

file.addEventListener("change", function () {
  console.log(file.files[0]);
  if (file.files[0] != null) {
    imageShow.src = URL.createObjectURL(file.files[0]);
    imageShow.style.display = "inline";
    ProductImageUrl = "";
  }
});

editFile.addEventListener("change", function () {
  console.log(editFile.files[0]);
  if (editFile.files[0] != null) {
    editImageShow.src = URL.createObjectURL(editFile.files[0]);
    editImageShow.style.display = "inline";
    ProductImageUrl = "";
  }
});

async function getAllCategory() {
  await firebase
    .database()
    .ref("CATGEORY")
    .get()
    .then((snap) => {
      console.log(snap.val())
      if (snap.val() == null) {
        // console.log("No data found");
        return;
      }
      var data = Object.values(snap.val());
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        productCategory.innerHTML +=
          `<option value="${data[i]["catName"]}">${data[i]["catName"]}</option>`;

        editproductCat.innerHTML += `
        <option value="${data[i]["catName"]}">${data[i]["catName"]}</option>`;
      }
    })

    .catch(E => {
      console.log(E)
    })
};

async function editProduct(key) {
  console.log(key);
  // alert("edit product")
  editModal.classList.add("active");
  await firebase
    .database()
    .ref("Products")
    .child(key)
    .get()
    .then((Snap) => {
      console.log(Snap.val());
      document.getElementById("editprod-name").value =
        Snap.val()["productName"];
      document.getElementById("editprod-cat").value = Snap.val()["productCat"];
      document.getElementById("editprod-price").value =
        Snap.val()["productPrice"];
      document.getElementById("editimageShow").src = Snap.val()["productImage"];
      document.getElementById("editimageShow").classList.add("img");
      selectedkey = key;
      ProductImageUrl = Snap.val()["productImage"]
      // console.log( document.getElementById("editimageShow"))
    })
    .catch((E) => {
      console.log(E);
    });
}

async function updateProduct() {
  var productName = document.getElementById("editprod-name").value;
  var productCat = document.getElementById("editprod-cat").value;
  var productPrice = document.getElementById("editprod-price").value;
  var productImage = document.getElementById("editimageShow").src;

  if (ProductImageUrl == "") {
    var imageCheck = await uploadeditImage();
    console.log(imageCheck);
    if (imageCheck == true) {
      var object = {
        productName,
        productCat,
        productPrice,
        productImage: ProductImageUrl,
        Productkey: selectedkey,
      };
      console.log(object);

      await firebase.database().ref("Products").child(selectedkey).set(object);
      closeEditModal()
      getAllProducts()

    }
  } else {
    var object = {
      productName,
      productCat,
      productPrice,
      productImage,
      Productkey: selectedkey,
    };
    console.log(object);

    await firebase.database().ref("Products").child(selectedkey).set(object);
    closeEditModal()
    getAllProducts()
  }
};


// function openModal(id = null) {
//   // document.getElementById("").value = id || "";
//   modal.classList.add("active");
// };


function closeEditModal() {
  editModal.classList.remove("active");
};

async function deleteProduct(key) {
  console.log(key);
  await firebase.database().ref("Products").child(key).remove();
  alert("product delete successfully");
  getAllProducts();
};

getAllCategory();

// function uploadImage() {
//   event.preventDefault();
//   console.log(file.files);

//   console.log(file.files[0].size);
//   var checkSize = file.files[0].size / 1024 / 1024;
//   console.log(checkSize);
//   if (checkSize > 2) {
//     alert("please select image less then 2 mb");
//   } else {
//     const formdata = new FormData();
//     formdata.append("file", file.files[0]);
//     formdata.append("upload_preset", "Ecom-Web");

//     const requestOptions = {
//       method: "POST",
//       body: formdata,
//       redirect: "follow",
//     };

//     fetch(
//       "https://api.cloudinary.com/v1_1/dco3gsojj/image/upload",
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.secure_url);
//         userImageUrl = data.secure_url;
//       })
//       .catch((error) => console.error(error));
//   }
// }