const express = require('express');
const router = express.Router();
const basketController = require('../controller/basketController')

const BASKETS = new Map();
const ITEMS = require('../model/items');

router.post('', (req, res, next) => {
  let basket = req.body.basket || { totalPrice: 0, items: {} };
  const code = basket.id ? 405 : 200;
  let response = { error : 'ID not allowed in a POST request.' };
  if (code == 200) {
    basket.id = BASKETS.size + 1;
    response = basket;
    BASKETS.set(basket.id, basket);
  }
  res.status(code).send(response);
});

router.post('/:id/addItem/:itemCode', (req, res, next) => {
  const itemCode = req.params.itemCode;
  const basketId = parseInt(req.params.id);
  if ( !ITEMS[itemCode] ) {
    res.status(404).send({ error: 'Item not found.' });
  } else if ( !BASKETS.has(basketId) ) {
    res.status(404).send({ error: 'Basket not found.' });
  } else {
    const basket = BASKETS.get(basketId);
    const item = ITEMS[itemCode];
    if (!basket.items[itemCode]) {
      basket.items[itemCode] = 0;
    }
    basket.items[itemCode]++;
    basket.totalPrice = basketController.calculateTotalPrice(basket);
    res.status(200).send(basket);
  }
});

router.get('', (req, res, next) => {
  const jsonResponse = {};
  const basketsJson = {};
  let basketCount = 0;
  BASKETS.forEach((value, key) => {
    if(!value.deleted) {
      basketsJson[key] = value;
      basketCount++;
    }
  })
  jsonResponse.baskets = basketsJson; 
  jsonResponse.count = basketCount;
  res.status(200).send(jsonResponse);
});

router.get('/:id', (req, res, next) => {
  const basketId = parseInt(req.params.id);
  const code = basketId && BASKETS.has(basketId) ? 200 : 404;
  let response = code === 200
               ? BASKETS.get(basketId)
               : { error: 'Basket not found' }
  res.status(code).send(response);
});

router.delete('/:id', (req, res, next) => {
  const basketId = parseInt(req.params.id);
  const code = BASKETS.has(basketId) ? 200 : 404;
  let response = { error: 'Basket not found' }; 
  if (code === 200) {
    response = BASKETS.get(basketId);
    response.deleted = true; //soft delete
    BASKETS.set(response.id, response);
  }
  res.status(code).send(response);
});

router.delete('/:id/removeItem/:itemCode', (req, res, next) => {
  const basketId = parseInt(req.params.id);
  const itemCode = req.params.itemCode;
  let code = BASKETS.has(basketId) ? 200 : 404;
  let response = { error: 'Basket not found' };
  if (code === 200) {
    const basket = BASKETS.get(basketId);
    if (!basket.items[itemCode]) {
      code = 400;
      response = { error: 'Item not found in basket.' }
    } else {
      basket.items[itemCode]--
      if (basket.items[itemCode] === 0) {
        delete basket.items[itemCode]; //Just to keep the object clean
      }
      basket.totalPrice = basketController.calculateTotalPrice(basket);
      response = basket;
    }
  }
  res.status(code).send(response);
});

module.exports = router;