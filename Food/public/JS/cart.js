const productsEl = document.querySelector(".products__gallery");
const cartItemsEl = document.querySelector(".cartSection__items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const closeCart = document.querySelector("#close-cart-btn");
const makeOrder = document.querySelector("#makeOrder");
var uid ='';
var db ='';

// RENDER PRODUCTS
function renderProdcuts() {
  products = [];
  var db = firebase.database().ref("Admin/Products/");

  db.on('value', (snapshot) => {
    snapshot.forEach(function(childSnapshot) {
      products.push(childSnapshot.val());

      productsEl.innerHTML += `
      <div class="box">   
          <img src="${childSnapshot.val().imgUrl}" alt="${childSnapshot.val().name}">
          <div class="content">
              <h2>${childSnapshot.val().name}</h2>
              <p>${childSnapshot.val().discription}</p>
              <button class="btn-danger btn-lg p-3 text-center" onclick="addToCart(this)" id="${childSnapshot.val().id}"> add to bucket</button>
          </div>
      </div>
  `;
    });
  });
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(button) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === button.id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === button.id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): INR ${totalPrice.toFixed(
    2
  )}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cartSection__item">
            <div class="cartSection__info" id="${item.id}" onclick="removeItemFromCart(this)">
                <img src="${item.imgUrl}" class="product-img" alt="${item.name}">
                <h4>  ${item.name}</h4>
            </div>
            <div class="cartSection__price">
                <span>INR ${item.price}</span>
            </div>
            <div class="units">
                <div class="units__symbol" id ="${item.id}" onclick="changeNumberOfUnits('minus', this)">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="units__symbol" id ="${item.id}" onclick="changeNumberOfUnits('plus', this)">+</div>           
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(button) {
 cart = cart.filter((item) => item.id !== button.id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, button) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === button.id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.stock) {
        numberOfUnits++;
      } 
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// check out section
function checkOut() { 
  if(cart.length === 0) {
    alert("Cart is empty. Add some items in cart to order.");
    closeCart.click();
    return;
  }

  uid = '_' + Math.random().toString(36).substr(2, 9);
  db = firebase.database().ref("Admin/Orders/"+uid);
  cart.forEach((item) => {
    const itemObj = {
      item_id : item.id,
      name : item.name,
      price : item.price,
      quantity : item.numberOfUnits
    }
    db.child('/Orders').push(itemObj);
  });
  closeCart.click();
  var myModal = new bootstrap.Modal(document.getElementById('addressModal'), {});
  myModal.show();
}

makeOrder.addEventListener("click",function() {

  const fullName = document.getElementById('fullName').value;
  const address = document.getElementById('homeAddress').value;
  const mobile = document.getElementById('mobile').value;
  const d = new Date();
  const month = d.getMonth() + 1;
  console.log(month);
  let date = d.getDate()+'-'+month+'-'+d.getFullYear();
  console.log(date);
  if(fullName !== '' && address !== '' && mobile !== '') {
    const details = {
      Name : fullName,
      Address : address,
      Mobile : mobile,
      Date : date 
    }
    db.child('/Details').push(details);
    alert("Order is placed.");
    resetForm();
    cart = [];
    updateCart();
  }else {
    alert('Fill all details');
  }
})

function resetForm() {
  document.getElementById('fullName').value='';
  document.getElementById('homeAddress').value='';
  document.getElementById('mobile').value='';
}

  