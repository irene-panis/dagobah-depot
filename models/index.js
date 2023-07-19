const User = require('./User');
const Listing = require('./Listing');
const Category = require('./Category');

User.hasMany(Listing, {
  foreignKey: 'seller_id',
  onDelete: 'CASCADE'
});

Listing.belongsTo(User, {
  foreignKey: 'seller_id'
});

Listing.belongsTo(Category, {
  foreignKey: 'category_id',
});

module.exports = { User, Listing, Category };