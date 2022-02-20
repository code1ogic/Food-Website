let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active')
}

function demo(){
    alert("your order is confirmed");
}

window.onscroll = () =>
{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY > 60){
        document.querySelector('#scroll-top').classList.add('active');
    }else{
        document.querySelector('#scroll-top').classList.remove('active');
    }

}

// let loginForm = document.querySelector(".login-form-container");

// document.querySelector("#login-btn").onclick = () => {
//   loginForm.classList.toggle("active");
// };

// document.querySelector("#close-login-btn").onclick = () => {
//   loginForm.classList.remove("active");
// };

let showCart = document.querySelector(".show-cart-div");

document.querySelector("#cart-btn").onclick = () => {
    showCart.classList.toggle("show-cart");
}

document.querySelector("#close-cart-btn").onclick = () => {
  showCart.classList.remove("show-cart");
};

