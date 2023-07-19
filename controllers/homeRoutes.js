const router = require('express').Router();
const { Listing, User } = require('../models');

// homepage listing products - not sure if we're listing everything on homepage?
router.get('/', async (req, res) => {
  try {
    const dbListingData = await Listing.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const listings = dbListingData.map((listing) =>
      listing.get({ plain: true })
    );
    listings.reverse(); // so we can see most recent listing first
    console.log(listings);
    res.render('homepage', {
      listings
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders login page
router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// renders signup page
router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;