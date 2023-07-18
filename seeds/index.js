const sequelize = require('../config/connection');
const seedCategories = require('./categoryData');
const seedListings = require('./listingData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategories();

  await seedListings();

  await seedUsers();

  process.exit(0);
};

seedAll();