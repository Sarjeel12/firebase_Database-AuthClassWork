checkAuth();
document.getElementById('sidebar-container').innerHTML = getSidebar();


console.log(firebase.database());


let categories = getData('categories');
const tableBody = document.getElementById('table-body');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');

function render() {
    tableBody.innerHTML = categories.map(cat => `
                <tr>
                    <td>#${cat.id}</td>
                    <td>${cat.name}</td>
                    <td>${cat.count}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="edit(${cat.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="del(${cat.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
}

function openModal(id = null) {
    document.getElementById('edit-id').value = id || '';
    document.getElementById('modal-title').textContent = id ? 'Edit Category' : 'Add Category';
    if (id) {
        const cat = categories.find(c => c.id === id);
        document.getElementById('cat-name').value = cat.name;
        document.getElementById('cat-count').value = cat.count;
    } else {
        modalForm.reset();
    }
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function edit(id) {
    openModal(id);
}

function del(id) {
    if (confirm('Are you sure?')) {
        categories = categories.filter(c => c.id !== id);
        setData('categories', categories);
        render();
    }
}

modalForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('cat-name').value;
    const count = document.getElementById('cat-count').value;

    var catKey = firebase.database().ref("category").push().getKey(); //Key Generator

    var object = {
        name: name,
        count: count,
        catKey: catKey
    }
    console.log(object);

    await firebase.database().ref("category").chlid(catKey).set(object);
    alert("Add New Category");

    // if (id) {
    //     const index = categories.findIndex(c => c.id == id);
    //     categories[index] = { id: parseInt(id), name, count: parseInt(count) };
    // } else {
    //     const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    //     categories.push({ id: newId, name, count: parseInt(count) });
    // }
    // setData('categories', categories);
    // render();


    closeModal();
};

async function getAllCategory() {
    await firebase.datbase().ref("CATEGORY").get().then((db) => (
        console.log(databseCat.val())

    ))
}
getAllCategory()
// render();