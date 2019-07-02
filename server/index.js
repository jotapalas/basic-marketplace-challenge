let express = require('express');
let app = express();

let baskets = [];

app.post('/basket', (req, res, next) => {
  let basket = req.basket || {};
  baskets.push(basket);
  res.send(baskets);
})

app.listen(3000, () => {
 console.log('Server running on port 3000');
});