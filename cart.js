/* ============================================================
   cart.js — Shared cart logic used on all 5 pages
   
   This file handles:
   1. The list of all products (name + price)
   2. Adding items to the cart (saved in localStorage)
   3. Reading the cart back from localStorage
   4. Updating the cart count badge in the header
   
   Include this file on every page like this:
   <script src="cart.js"></script>
   ============================================================ */


/* --- PRODUCT LIST ---
   All products with their id, name, and price.
   We use an array (a list) where each item is an object {}.
   The id matches the ?id= number in the URL on product.html */
var PRODUCTS = [
  { id: 0, name: "Decoration Flora Koala",            price: 15.00, img: "images/flora-koala.jpg" },
  { id: 1, name: "Decoration Flora Kangaroo",         price: 15.00, img: "images/flora-kangaroo.jpg" },
  { id: 2, name: "Decoration Gumleaf Kookaburra",     price: 15.00, img: "images/gumleaf-kookaburra.jpg" },
  { id: 3, name: "Christmas Tree Card",               price: 17.50, img: "images/christmas-card.jpg" },
  { id: 4, name: "Christmas Koala Decoration",        price: 30.00, img: "images/christmas-koala.jpg" },
  { id: 5, name: "Christmas Kangaroo Decoration",     price: 30.00, img: "images/christmas-kangaroo.jpg" },
  { id: 6, name: "Festive Christmas Tree Decoration", price: 50.00, img: "images/festive-tree.jpg" }
];


/* --- getCart() ---
   Reads the cart from localStorage and returns it as a JavaScript array.
   
   localStorage stores everything as plain text (a string).
   JSON.parse() converts that text back into a JavaScript array.
   If the cart doesn't exist yet, we return an empty array []. */
function getCart() {
  var stored = localStorage.getItem("cart"); // get the text from storage
  if (stored) {
    return JSON.parse(stored); // convert text → JavaScript array
  }
  return []; // return empty array if nothing is stored yet
}


/* --- saveCart(cart) ---
   Saves the cart array into localStorage.
   
   localStorage can only store text, so JSON.stringify() converts
   our JavaScript array into a text string first. */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


/* --- addToCart(productId) ---
   Adds one item to the cart, or increases the quantity if it's already there.
   
   Steps:
   1. Read the current cart from localStorage
   2. Check if this product is already in the cart
   3. If yes, increase qty by 1
   4. If no, add a new entry to the cart
   5. Save the updated cart back to localStorage */
function addToCart(productId) {
  // Find the product in our PRODUCTS list using its id
  var product = PRODUCTS[productId];
  if (!product) {
    return; // stop if the product doesn't exist
  }

  // Read the current cart
  var cart = getCart();

  // Check if this product is already in the cart
  var existingItem = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      existingItem = cart[i];
      break; // stop searching once we find it
    }
  }

  if (existingItem) {
    // Product already in cart → just increase the quantity
    existingItem.qty = existingItem.qty + 1;
  } else {
    // New product → add it to the cart with qty of 1
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  // Save the updated cart
  saveCart(cart);

  // Update the badge number in the header
  updateCartBadge();

  // Show a brief "Added!" message
  showToast(product.name + " added to cart!");
}


/* --- updateCartBadge() ---
   Counts all items in the cart and updates the number
   shown in the header cart icon.
   
   We add up all the qty numbers to get the total count. */
function updateCartBadge() {
  var badge = document.getElementById("cart-badge");
  if (!badge) {
    return; // this page might not have a badge
  }

  var cart = getCart();
  var totalItems = 0;

  // Add up all quantities
  for (var i = 0; i < cart.length; i++) {
    totalItems = totalItems + cart[i].qty;
  }

  // Show the number (or hide the badge if cart is empty)
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}


/* --- showToast(message) ---
   Shows a small pop-up message at the bottom of the screen
   for 2 seconds, then fades it out.
   This lets the user know their item was added. */
function showToast(message) {
  var toast = document.getElementById("toast");
  if (!toast) {
    return;
  }
  toast.textContent = message;
  toast.classList.add("show");

  // After 2000 milliseconds (2 seconds), remove the "show" class
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}


/* --- removeFromCart(productId) ---
   Removes one product completely from the cart.

   How it works:
   1. Read the current cart array from localStorage.
   2. Loop through every item in the cart.
   3. If an item's id matches the productId we want to remove,
      we skip it (don't copy it into the new array).
   4. If an item's id does NOT match, we keep it.
   5. Save the new (shorter) array back to localStorage.
   6. Update the badge count in the header.

   This technique — building a new array without the unwanted item —
   is called "filtering". It is simple and easy to explain. */
function removeFromCart(productId) {

  // Read the current cart from localStorage
  var cart = getCart();

  // Build a new empty array to hold the items we want to KEEP
  var newCart = [];

  // Loop through every item in the old cart
  for (var i = 0; i < cart.length; i++) {

    // Only keep items whose id does NOT match the one we are removing
    if (cart[i].id !== productId) {
      newCart.push(cart[i]); // copy this item across to the new cart
    }
    // If cart[i].id === productId, we do nothing → it gets left out
  }

  // Save the updated cart (the removed item is no longer in it)
  saveCart(newCart);

  // Update the badge number shown on the cart icon in the header
  updateCartBadge();
}


/* --- Run on every page load ---
   As soon as the page loads, update the cart badge in the header */
document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
});
