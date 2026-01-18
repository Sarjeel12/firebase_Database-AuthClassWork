console.log(firebase.database());

var stats_categories = document.getElementById("stats-categories");

var loading = document.getElementById("loading");
var cards = document.getElementById("cards");

async function geAllCounts() {
    await firebase
        .database()
        .ref("CATGEORY")
        .get()
        .then((snap) => {
            var data = snap.val();
            if (data == null) {
                stats_categories.innerText = 0;
                loading.setAttribute("class", "hide");
                cards.setAttribute("class", "stats-grid");
            } else {
                var getLength = Object.values(data); //convert data into array
                stats_categories.innerText = getLength.length;
                loading.setAttribute("class", "hide");
                cards.setAttribute("class", "stats-grid");
            }
        })
        .catch((E) => {
            console.log(E);
        });
}

geAllCounts();
