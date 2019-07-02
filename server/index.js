const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let baskets = new Map();

app.use(bodyParser.json());

app.post('/basket', (req, res, next) => {
  let basket = req.body.basket || {};
  let code = basket.id ? 405 : 200;
  let response = { 'error' : 'ID not allowed in a POST request. Use PUT instead.' };
  if (code == 200) {
    basket.id = baskets.size + 1;
    response = basket;
    baskets.set(basket.id, basket);
  }
  res.status(code).send(response);
});

app.get('/basket/:id', (req, res, next) => {
  let basketId = parseInt(req.params.id);
  let code = basketId && baskets.has(basketId) ? 200 : 404;
  let response = code === 200
               ? baskets.get(basketId)
               : { 'error': 'Basket not found' }
  res.status(code).send(response);
});

app.get('/basket', (req, res, next) => {
  res.status(200).send(baskets);
});

app.delete('/basket/:id', (req, res, next) => {
  let basketId = parseInt(req.params.id);
  let code = baskets.has(basketId) ? 200 : 404;
  let response = { 'error': 'Basket not found' }; 
  if (code === 200) {
    response = baskets.get(basketId);
    baskets.delete(basketId);
  }
  res.status(code).send(response);
});

app.listen(3000, () => {
 console.log('Server running on port 3000');
});