const discounts = require('./discounts')

const ITEMS = {
  VOUCHER: {
    name: 'Cabify Voucher',
    price: 5.0,
    discount: discounts.buy2Get1Free
  },
  TSHIRT: {
    name: 'Cabify T-Shirt',
    price: 20.0,
    discount: discounts.reducedPrice,
    reducedPrice: 19.0
  },
  MUG: {
    name: 'Cabify Coffee Mug',
    price: 7.5
  }
};

module.exports = ITEMS;