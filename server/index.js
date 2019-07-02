const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const basketRoutes = require('./routes/basket');

let baskets = new Map();

app.use(bodyParser.json());
app.use('/basket', basketRoutes);

app.listen(3000, () => {
 console.log('Server running on port 3000');
});