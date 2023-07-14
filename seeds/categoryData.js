const { Category } = require('../models');

const categories = [
  {
    category_name: 'Clothing',
  },
  {
    category_name: 'Games',
  },
  {
    category_name: 'Movies/TV',
  },
  {
    category_name: 'Books/Comics',
  },
];

const seedCategories = () => Category.bulkCreate(categories);

module.exports = seedCategories;