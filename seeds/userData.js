const { User } = require('../models');

const users = [
  {
    name: 'George Lucas',
    email: 'georgelucas@email.com',
    password: 'ilovestarwars'
  },
  {
    name: 'Han Solo',
    email: 'hansolo@email.com',
    password: 'ilovestarwars'
  },
  {
    name: 'Luke Skywalker',
    email: 'luke@email.com',
    password: 'ilovestarwars'
  },
  {
    name: 'Princess Leia',
    email: 'princessleia@email.com',
    password: 'ilovestarwars'
  },
];

const seedUsers = () => User.bulkCreate(users);

module.exports = seedUsers;