const sequelize = require('../config/connection');
const seedCategory = require('./categoryData');
const seedListing = require('./listingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategory();

  await seedListing();

  process.exit(0);
};

seedAll();