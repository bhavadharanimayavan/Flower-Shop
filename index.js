let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');

}
// login page 

const loginBtn = document.querySelector("#login");
const resisterBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

loginBtn.addEventListener('click', () =>{
    loginBtn.style.backgroundColor = "#21264D";
    resisterBtn.style.backgroundColor="rgba(255, 255,255,0.2)";

    loginForm.style.left="50%";
    registerForm.style.left="-50%";

     
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
   
})

resisterBtn.addEventListener('click', () =>{
    loginBtn.style.backgroundColor = "rgba(255, 255,255,0.2)";
    resisterBtn.style.backgroundColor="#21264D";

    loginForm.style.left="150%";
    registerForm.style.left="50%";

    
    loginForm.style.opacity = 0;
    registerForm.style.opacity=1;

    document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
    
   
});

//registation validation


let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let popup = document.querySelector('#popup');

let username = id("username"),
    email = id("email"),
    password = id("password"),
    errormsg = classes("error");
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon"),
    form1 = id("Regform")

form1.addEventListener( "submit", (e)=>{
  
  e.preventDefault();

  inputValidation(email, 0, "mail cannot be blank");
  inputValidation(username, 1, "username cannot be blank");
    inputValidation(password, 2, "password cannot be blank");

    if(username.value!==""&&email.value!==""&&password.value!=="") {
      // alert();
      popup.classList.add('open-pop');
  }
});

let inputValidation = (id, serial, message) => {
  if (id.value.trim() === "") {
    errormsg[serial].innerHTML = message;
    username.style.border = "2px solid red";

    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
    
} else {

    errormsg[serial].innerHTML = "";
    id.style.border = "2px solid green";

    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
}
}

closePop=()=>{
  popup.classList.remove('open-pop');

  username.value = "";
  email.value = "";
  password.value = "";

  for (let i = 0; i < successIcon.length; i++) {
    successIcon[i].style.opacity = "0";
  }

  username.style.border = "1px solid #ccc";
  email.style.border = "1px solid #ccc";
  password.style.border = "1px solid #ccc";
  

  for (let i = 0; i < errormsg.length; i++) {
    errormsg[i].innerHTML = "";
  }
  
}






//    add to card page
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.bbtn');
  const cartItemsCount = document.querySelector('.cart-icon span');
  const cartItemsList = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const cartIcon = document.querySelector('.cart-icon');
  const sidebar = document.getElementById('sidebar');

  let cartItems = [];
  let totalAmount = 0;

  addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          const item = {
              name: document.querySelectorAll('.row .title')[index].textContent,
              price: parseFloat(
                  document.querySelectorAll('.price')[index].textContent.slice(1),
              ),
              quantity: 1,
          };

          const existingItem = cartItems.find(
              (cartItem) => cartItem.name === item.name,
          );

          if (existingItem) {
              existingItem.quantity++;
          } else {
              cartItems.push(item);
          }

          totalAmount += item.price;

          updateCartUI();
      });
  });

  function updateCartUI() {
      updateCartItemCount(cartItems.length);
      updateCartItemList();
      updateCartTotal();
  }

  function updateCartItemCount(count) {
      cartItemsCount.textContent = count;
  }

  function updateCartItemList() {
      cartItemsList.innerHTML = '';
      cartItems.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item', 'individual-cart-item');
          cartItem.innerHTML = `
              <span> (${item.quantity}x) ${item.name}</span>
              <span class="cart-item-price">
                  $${(item.price * item.quantity).toFixed(2)}
                  <button class="remove-btn" data-index="${index}">
                      <i class="fa-solid fa-times"></i>
                  </button>
              </span>
          `;
          cartItemsList.append(cartItem);
      });

      const removeButtons = document.querySelectorAll('.remove-btn');
      removeButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
              const index = event.target.closest('button').dataset.index;
              removeItemFromCart(index);
          });
      });
  }

  function removeItemFromCart(index) {
      const removedItem = cartItems.splice(index, 1)[0];
      totalAmount -= removedItem.price * removedItem.quantity;
      updateCartUI();
  }

  function updateCartTotal() {
      cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
  }

  cartIcon.addEventListener('click', () => {
      sidebar.classList.toggle('open');
  });

  const closeButton = document.querySelector('.sidebar-close');
  closeButton.addEventListener('click', () => {
      sidebar.classList.remove('open');
  });
});
