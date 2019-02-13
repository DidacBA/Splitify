const mongoose = require('mongoose');
const Bill = require('../models/bill');
const User = require('../models/user');
require('dotenv').config();


mongoose
  .connect('mongodb://localhost:27017/splitify', {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: '${x.connections[0].name}'`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

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

const users = [
  {
    username: 'didac',
    imgPath: 'https://i.imgur.com/etjgJ2D.jpg',
    confirmationCode: '123',
    email: '1@gmail.com',
    password: '1234',
    status: true,
  },
  {
    username: 'test',
    imgPath: 'https://i.imgur.com/etjgJ2D.jpg',
    confirmationCode: '1234',
    status: false,
    email: '2@gmail.com',
    password: '1234',
  },
  {
    username: 'ranieri',
    imgPath: 'https://i.imgur.com/etjgJ2D.jpg',
    confirmationCode: '1235',
    email: '3@gmail.com',
    password: '1234',
    status: true,
  },
  {
    username: 'marc',
    imgPath: 'https://i.imgur.com/etjgJ2D.jpg',
    confirmationCode: '1236',
    email: '4@gmail.com',
    password: '1234',
    status: false,
  },
  {
    username: 'pedro',
    imgPath: 'https://i.imgur.com/etjgJ2D.jpg',
    confirmationCode: '1237',
    email: '5@gmail.com',
    password: '1234',
    status: true,
  },
];

User.create(users)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));


// Bill.create(bills)
//   .then(data => console.log('Data added', data))
//   .then(() => mongoose.connection.close())
//   .catch(error => console.log('Couldn\'t add files', error));
