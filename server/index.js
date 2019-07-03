const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const basketRoutes = require('./routes/basket');
const itemRoutes = require('./routes/item');

app.use(bodyParser.json());
app.use(express.static(path.resolve('client')));

app.use('/api/basket', basketRoutes);
app.use('/api/item', itemRoutes);

app.get('/', (req, res, next) => {
  res.sendFile('client/index.html');
})

app.listen(3000, () => {
 console.log('Server running on port 3000');
});