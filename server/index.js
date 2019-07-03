const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const basketRoutes = require('./routes/basket');
const itemRoutes = require('./routes/item');

app.use(bodyParser.json());
app.use('/basket', basketRoutes);
app.use('/item', itemRoutes);

app.listen(3000, () => {
 console.log('Server running on port 3000');
});