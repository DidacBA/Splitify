const mongoose = require('mongoose');
const Bill = require('../models/bill');
const User = require('../models/user');


mongoose
  .connect('mongodb://localhost/splitify', {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: '${x.connections[0].name}'`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// const users = [];
const bills = [{
  creatorId: '5c5c187d4f57c3680e8164c5',
  participants: ['5c5c187d4f57c3680e8164c5', '5c5c18514f57c3680e8164c4'],
  items: [
    {
      name: 'beer',
      price: '100',
      userId: '5c5c18514f57c3680e8164c4',
  },
  {
      name: 'vodka',
      price: '10',
      userId: '5c5c187d4f57c3680e8164c5',
  }],
}];

// User.create(users)
//   .then(data => console.log('Data added', data))
//   .then(() => mongoose.connection.close())
//   .catch(error => console.log('Couldn\'t add files', error));


Bill.create(bills)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));