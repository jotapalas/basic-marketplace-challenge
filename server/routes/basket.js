const express = require('express');
const router = express.Router();

const BASKETS = new Map();
const ITEMS = {
  VOUCHER: {
    name: 'Cabify Voucher',
    price: 5.0
  },
  TSHIRT: {
    name: 'Cabify T-Shirt',
    price: 20.0
  },
  MUG: {
    name: 'Cabify Coffee Mug',
    price: 7.5
  }
};

router.post('', (req, res, next) => {
  let basket = req.body.basket || { amount: 0, items: {} };
  let code = basket.id ? 405 : 200;
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
  if ( !itemCode in ITEMS ) {
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
    basket.amount += item.price;
    res.status(200).send(basket);
  }
});

router.get('', (req, res, next) => {
  res.status(200).send(BASKETS);
});

router.get('/:id', (req, res, next) => {
  let basketId = parseInt(req.params.id);
  let code = basketId && BASKETS.has(basketId) ? 200 : 404;
  let response = code === 200
               ? BASKETS.get(basketId)
               : { error: 'Basket not found' }
  res.status(code).send(response);
});

router.delete('/:id', (req, res, next) => {
  let basketId = parseInt(req.params.id);
  let code = BASKETS.has(basketId) ? 200 : 404;
  let response = { error: 'Basket not found' }; 
  if (code === 200) {
    response = BASKETS.get(basketId);
    BASKETS.delete(basketId);
  }
  res.status(code).send(response);
});

module.exports = router;