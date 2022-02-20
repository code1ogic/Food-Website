var products = [];

var db = firebase.database().ref("Admin/Products/");

db.on('value', (snapshot) => {
  snapshot.forEach(function(childSnapshot) {
    products.push(childSnapshot.val());
  })
});
