const { Category } = require('../models');

const categories = [
  {
    name: 'Clothing',
  },
  {
    name: 'Games',
  },
  {
    name: 'Movies/TV',
  },
  {
    name: 'Books/Comics',
  },
];

const seedCategories = () => Category.bulkCreate(categories);

module.exports = seedCategories;