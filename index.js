const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

let cors = require('cors');
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
function addToCart(arr, id, pname, p, q) {
  if (q <= 0) {
  } else {
    arr.push({ productId: id, name: pname, price: p, quantity: q });
  }
  return arr;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let qty = parseInt(req.query.quantity);

  let newCart = addToCart(cart, productId, name, price, qty);
  res.json({ cartItems: newCart });
});
function editcartById(arr, cid, qty) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].productId === cid) {
      arr[i].quantity = qty;
    }
  }
  return arr;
}
app.get('/cart/edit', (req, res) => {
  let cId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let newCart = editcartById(cart, cId, quantity);
  res.json({ cartItems: newCart });
});

function deleteFromCart(arr, id) {
  return arr.productId !== id;
}

app.get('/cart/delete', (req, res) => {
  let cId = parseInt(req.query.productId);
  let newCart = cart.filter((ele) => deleteFromCart(ele, cId));
  res.json({ cartItems: newCart });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function cartTotalQuantity(arr) {
  sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].quantity;
  }
  return sum;
}

app.get('/cart/total-quantity', (req, res) => {
  let totalQty = cartTotalQuantity(cart);
  res.json({ totalQuantity: totalQty });
});

function cartTotalPrice(arr) {
  sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].price * arr[i].quantity;
  }
  return sum;
}

app.get('/cart/total-price', (req, res) => {
  let total = cartTotalPrice(cart);
  res.json({ totalPrice: total });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
