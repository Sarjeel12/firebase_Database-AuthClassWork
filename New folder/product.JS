document.getElementById('sidebar-container').innerHTML = getSidebar();
var modal = document.getElementById("modal");
var file = document.getElementById("file");
var imageShow = document.getElementById("imageShow");
var productCategory = document.getElementById("productCategory");


file.addEventListener("change", function () {
    console.log(file.files[0]);
    imageShow.src = URL.createObjectURL(file.files[0]);
    imageShow.style.display = "inline";
});


async function getAllCategory() {
    await firebase.database().ref("CATGEORY").get()
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
                `<option value="${data[i]["catName"]}">${data[i]["catName"]}</option>`
  }  })

        .catch(E => {
            console.log(E)
        })
};

getAllCategory();



function openModal(id = null) {
    // document.getElementById("").value = id || "";
    modal.classList.add("active");
};


function closeModal() {
    modal.classList.remove("active");
}




function uploadImage() {
    event.preventDefault();
    console.log(file.files);

  console.log(file.files[0].size);
  var checkSize = file.files[0].size / 1024 / 1024;
  console.log(checkSize);
  if (checkSize > 2) {
    alert("please select image less then 2 mb");
  } else {
    const formdata = new FormData();
    formdata.append("file", file.files[0]);
    formdata.append("upload_preset", "Ecom-Web");

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://api.cloudinary.com/v1_1/dco3gsojj/image/upload",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.secure_url);
        userImageUrl = data.secure_url;
      })
      .catch((error) => console.error(error));
  }
}