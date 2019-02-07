const mongoose = require('mongoose');
const billModel = require('../models/bill');
const userModel = require('../models/user');


mongoose
  .connect('mongodb://localhost/splitify', {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const seed = [];

userModel.create(seed)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));


billModel.create(seed)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));