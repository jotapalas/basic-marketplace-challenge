const ITEMS = require('../model/items')

const calculateTotalPrice = (basket) => {
  if (!basket.items || basket.items.length === 0) {
    return -1;
  }

  totalPrice = 0;
  for (item in basket.items) {
    const modelItem = ITEMS[item];
    const itemAmount = basket.items[item];
    if (modelItem.discount && modelItem.discount.isAppliable(itemAmount)) {
      const itemPrice = modelItem.reducedPrice || modelItem.price;
      totalPrice += modelItem.discount.calculatePrice(itemAmount, itemPrice);
    } else {
      totalPrice += modelItem.price * itemAmount;
    }
  }

  return totalPrice;
}

module.exports = {
  calculateTotalPrice: calculateTotalPrice
};