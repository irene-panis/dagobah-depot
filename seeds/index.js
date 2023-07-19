const sequelize = require('../config/connection');
const seedCategories = require('./categoryData');
const seedListings = require('./listingData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  
  await seedCategories();

  await seedListings();


  process.exit(0);
};

seedAll();