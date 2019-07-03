const express = require('express');
const router = express.Router();

const ITEMS = require('../model/items');

router.get('', (req, res, next) => {
  res.status(200).send(ITEMS);
});

router.get('/:itemCode', (req, res, next) => {
  const itemCode = req.params.itemCode;
  const code = ITEMS[itemCode] ? 200 : 404;
  const response = code === 200 ? ITEMS[itemCode] : { error: 'Item not found.' };
  res.status(code).send(response);
});

module.exports = router;