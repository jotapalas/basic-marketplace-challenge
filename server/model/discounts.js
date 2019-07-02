const DISCOUNTS = {
  buy2Get1Free: {
    name: '3x2',
    isAppliable: (amount) => {
      return amount > 2;
    },
    calculatePrice: (amount, pricePerUnit) => {
      let totalPrice = 0;
      while (amount > 2) {
        totalPrice += 2*pricePerUnit;
        amount -= 3;
      }
      totalPrice += amount*pricePerUnit;
      return totalPrice;
    }
  },

  reducedPrice: {
    name: "reducedPrice",
    isAppliable: (amount) => {
      return amount >= 3;
    },
    calculatePrice: (amount, pricePerUnit) => {
      return amount*pricePerUnit;
    }
  }
};

module.exports = DISCOUNTS;