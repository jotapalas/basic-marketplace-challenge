let express = require('express');
let app = express();

let baskets = [];

app.post('/basket', (req, res, next) => {
  let basket = req.basket || {};
  baskets.push(basket);
  res.send(200, basket);
});

app.get('/basket/:id', (req, res, next) => {
  let basketId = req.params.id;
  let code = basketId && basketId < baskets.length ? 200 : 404;
  let response = code === 200
               ? baskets[basketId]
               : { 'error': 'Basket not found' }
  res.send(code, response);
});

app.get('/basket', (req, res, next) => {
  res.send(200, baskets);
});

app.listen(3000, () => {
 console.log('Server running on port 3000');
});