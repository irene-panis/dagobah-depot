const { Listing } = require('../models');

const listings = [
  {
    listing_name: 'Boba Fett Volcano Button-Up',
    description: 'Boba Fett is the galaxy\'s most merciless bounty hunter. But he might show you some mercy if he sees you wearing this Boba Fett button-up inspired by the Star Wars villain. With a Japanese-style volcano allover print, this shirt may prevent any future disintegrations.',
    upload_date: '07-13-2023',
    price: '13.20',
    category_id: 1,
    seller: 'Luke Skywalker',
  },
  {
    listing_name: 'Star Wars Jedi: Survivor - PlayStation 5',
    description: 'No longer a padawan, Cal has come into his own and grown into a powerful Jedi Knight. Cinematic combat system returns with additional force abilities and new lightsaber fighting styles. Discover new planets and familiar frontiers in the Star Wars galaxy, each with unique biomes, challenges, and enemies. Master new skills, equipment, and abilities that will augment the ways you explore, fight, and roam.',
    upload_date: '07-13-2023',
    price: '54.99',
    category_id: 2,
    seller: 'George Lucas',
  },
  {
    listing_name: 'Star Wars: The Empire Strikes Back [Blu-ray]',
    description: 'Discover the conflict between good and evil in the electrifying Star Wars: Episode V - The Empire Strikes Back. After the destruction of the Death Star, Imperial forces continue to pursue the Rebels. After the Rebellion\'s defeat on the ice planet Hoth, Luke journeys to the planet Dagobah to train with Jedi Master Yoda, who has lived in hiding since the fall of the Republic. In an attempt to convert Luke to the dark side, Darth Vader lures young Skywalker into a trap in the Cloud City of Bespin.',
    upload_date: '07-13-2023',
    price: '18.99',
    category_id: 3,
    seller: 'Obi-Wan Kenobi',
  },
  {
    listing_name: 'STAR WARS #1 (1977, Marvel Comics, 1st printing) CGC 9.8 White Pages',
    description: 'CGC 9.8 graded copy of STAR WARS #1 (1977, Marvel Comics, 1st printing with white pages). It will be shipped with tracking and signature required, and will be insured for the full purchase price.',
    upload_date: '07-13-2023',
    price: '9,995.00',
    category_id: 4,
    seller: 'Han Solo',
  },
];

const seedListings = () => Listing.bulkCreate(listings);

module.exports = seedListings;