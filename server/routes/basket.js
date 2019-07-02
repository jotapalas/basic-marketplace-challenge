const express = require('express');
const router = express.Router();

const baskets = new Map();

router.post('', (req, res, next) => {
  let basket = req.body.basket || { amount: 0, items: [] };
  let code = basket.id ? 405 : 200;
  let response = { error : 'ID not allowed in a POST request. Use PUT instead.' };
  if (code == 200) {
    basket.id = baskets.size + 1;
    response = basket;
    baskets.set(basket.id, basket);
  }
  res.status(code).send(response);
});

router.get('', (req, res, next) => {
  res.status(200).send(baskets);
});

router.get('/:id', (req, res, next) => {
  let basketId = parseInt(req.params.id);
  let code = basketId && baskets.has(basketId) ? 200 : 404;
  let response = code === 200
               ? baskets.get(basketId)
               : { error: 'Basket not found' }
  res.status(code).send(response);
});

router.delete('/:id', (req, res, next) => {
  let basketId = parseInt(req.params.id);
  let code = baskets.has(basketId) ? 200 : 404;
  let response = { error: 'Basket not found' }; 
  if (code === 200) {
    response = baskets.get(basketId);
    baskets.delete(basketId);
  }
  res.status(code).send(response);
});

module.exports = router;