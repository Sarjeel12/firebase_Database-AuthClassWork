// checkAuth();

document.getElementById('sidebar-container').innerHTML = getSidebar();
console.log(firebase.database());

let categories = getData('categories');
const tableBody = document.getElementById('table-body');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');


var updatebtn = document.getElementById("updatebtn");

// function render() {
//     tableBody.innerHTML = categories.map((cat) => `
//                 <tr>
//                     <td>#${cat.id}</td>
//                     <td>${cat.name}</td>
//                     <td>${cat.count}</td>
//                     <td>
//                         <button class="action-btn edit-btn" onclick="edit(${cat.id})">Edit</button>
//                         <button class="action-btn delete-btn" onclick="del(${cat.id})">Delete</button>
//                     </td>
//                 </tr>
//             `).join('');
// }
// function openModal(id = null) {
//     document.getElementById('edit-id').value = id || '';
//     document.getElementById('modal-title').textContent = id ? 'Edit Category' : 'Add Category';
//     if (id) {
//         const cat = categories.find((c) => c.id === id);
//         document.getElementById('cat-name').value = cat.name;
//         document.getElementById('cat-count').value = cat.count;
//     } else {
//         modalForm.reset();
//     }
//     modal.classList.add('active');
// }
// function closeModal() {
//     modal.classList.remove('active');
// }
// function edit(id) {
//     openModal(id);
// }
// function del(id) {
//     if (confirm('Are you sure?')) {
//         categories = categories.filter((c) => c.id !== id);
//         setData('categories', categories);
//         render();
//     }
// }

// // Add New Category function
// modalForm.onsubmit = async (e) => {
//     e.preventDefault();
//     const id = document.getElementById('edit-id').value;
//     const name = document.getElementById('cat-name').value;
//     const count = document.getElementById('cat-count').value;

//     var catKey = firebase.database().ref("CATEGORY").push().getKey(); //Key Generator
//     var object = {
//         CatName: name,
//         count: count,
//         catKey: catKey
//     }
//     console.log(object);

//     await firebase.database().ref("CATEGORY").child(catKey).set(object)
//     alert("Add New Category");

//     // if (id) {
//     //     const index = categories.findIndex(c => c.id == id);
//     //     categories[index] = { id: parseInt(id), name, count: parseInt(count) };
//     // } else {
//     //     const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
//     //     categories.push({ id: newId, name, count: parseInt(count) });
//     // }
//     // setData('categories', categories);
//     // render();
//     closeModal();
// };

// // async function getAllCategory() {
// //     await firebase.database().ref("CATEGORY").get().then((databaseCat) => {
// //         console.log(databaseCat.val());

// //         Object.values(databaseCat.val())
// //         console.log(data);

// //         for(var i = 0; i < data.length; i++){
// //             console.log(data[i])
// //         }
// //     });
// // }
// // getAllCategory();

// async function getAllCategory() {
//     await firebase.database().ref("CATEGORY").get().then((databaseCat) => {

//         //  MUST check
//         if (databaseCat.val() === null) {
//             console.log("No Category Found");
//             return;
//         }
//         let data = Object.values(databaseCat.val());
//         console.log(data);

//         for (var i = 0; i < data.length; i++) {
//             console.log(data[i]);
//         }
//     });
// }
// getAllCategory();

// // render();

var savebtn = document.getElementById("savebtn");
var selectedid = "";

// Sir Zubair code

async function openModal(id = null) {
    document.getElementById("edit-id").value = id || "";
    document.getElementById("modal-title").textContent = id
        ? "Edit Category"
        : "Add Category";
        selectedid = id;

        console.log(id);

    if (id != null) {
        // document.getElementById
        await firebase.database().ref("CATGEORY").child(id).get()
            .then((snapdb) => {
                console.log(snapdb.val())
                document.getElementById("cat-name").value = snapdb.val()["catName"]
                document.getElementById("cat-count").value = snapdb.val()["count"]
                updatebtn.style.display = "inline"
                savebtn.style.display = "none"
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        document.getElementById("cat-name").value = "";
        document.getElementById("cat-count").value = "";
        updatebtn.style.display = "none";
        savebtn.style.display = "inline";
    };

    // if (id) {
    //     const cat = categories.find((c) => c.id === id);
    //     document.getElementById("cat-name").value = cat.name;
    //     document.getElementById("cat-count").value = cat.count;
    // } else {
    //     modalForm.reset();
    // }


    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
};

function edit(id) {
    openModal(id);
};

function del(id) {
    if (confirm("Are you sure?")) {
        categories = categories.filter((c) => c.id !== id);
        setData("categories", categories);
        render();
    }
};


//add new category
 async function addNewCat () {
    // e.preventDefault();
    const id = document.getElementById("edit-id").value;
    const name = document.getElementById("cat-name").value;
    const count = document.getElementById("cat-count").value;

    //   push=> make new key => key =>make new key 
    //   set => set data /replace

    // Math.random()*1000=>0,1,2,
    var catKey = firebase.database().ref("CATGEORY").push().getKey(); // key generate   5
    // uid => uid

    var object = {
        catName: name,
        count: count,
        catKey: catKey
    };

    console.log(object);

    await firebase.database().ref("CATGEORY").child(catKey).set(object);
    alert("add new category");
    getAllCategory();


    closeModal();
};

 async function addUpdatedCat () {
    // e.preventDefault();
    // const id = document.getElementById("edit-id").value;
    const name = document.getElementById("cat-name").value;
    const count = document.getElementById("cat-count").value;

    //   push=> make new key => key =>make new key 
    //   set => set data /replace

    // Math.random()*1000=>0,1,2,
    // var catKey = firebase.database().ref("CATGEORY").push().getKey(); // key generate   5
    // uid => uid

    var object = {
        catName: name,
        count: count,
        catKey: selectedid,
    };

    console.log(object);

    await firebase.database().ref("CATGEORY").child(selectedid).set(object)
    alert("Updated");
    getAllCategory();


    closeModal();
};

async function getAllCategory() {
    await firebase.database().ref("CATGEORY").get().then((databaseCat) => {

        console.log(databaseCat); //FIREBASE READ FORMATE
        var db = databaseCat.val(); //convert firebase data into USER read able formaTE=>ojhect

        //object to convert into array

        // Object.values
        // Object.keys
        // tableBody.innerHTML="<h1>No Product<h1/>";

        if (db == null) {
            tableBody.innerHTML = "<h1>No Product<h1/>";
            return;
        } else {
            tableBody.innerHTML = "";
            var data = Object.values(databaseCat.val());
            // var key = Object.keys(databaseCat.val())
            // console.log(data);
            // console.log(key)
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i]["catKey"]);
                tableBody.innerHTML += `
          <tr>
          <td>${i + 1}</td>
          <td>${data[i].catName}</td>
          <td>${data[i]["count"]}</td>
          <td>
          <button onClick="openModal('${data[i]["catKey"]}')">Edit</button>
          <button onClick="deleteItem('${data[i]["catKey"]}')">
          Delete
          </button>
          </td>
          </tr>
          `;
            }
        }
    })
        .catch((e) => {
            console.log(e);
        });

};

getAllCategory();

async function deleteItem(key) {
    await firebase.database().ref("CATGEORY").child(key).remove()
    alert("Deleted");
    // console.log("Deleted", key);
    getAllCategory();
    console.log(key);
};

// setInterval(()=>{
// getAllCategory()
// },3000)

// render();


