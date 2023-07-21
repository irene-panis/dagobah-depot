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
    res.render('homepage', {
      listings,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders login page
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// renders signup page
router.get('/signup', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// renders checkout page
// we can add to this request if we need more stuff on checkout page
router.get('/checkout', async (req, res) => {
  res.render('checkout');
});

router.get('/profile', async (req, res) => {
  try {
    const dbListingData = await Listing.findAll({
      where: {
        seller_id: req.session.user_id,
      }
    });
    const listings = dbListingData.map((listing) =>
      listing.get({ plain: true })
    );
    listings.reverse(); // so we can see most recent listing first
    res.render('profile', {
      listings,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;