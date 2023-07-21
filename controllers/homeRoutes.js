const router = require('express').Router();
const { Listing, User, Category } = require('../models');

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
    if (!req.session.logged_in) {
      res.redirect('/'); // redirects to homepage if not logged in
    }
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
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one listing
router.get('/listings/:id', async (req, res) => {
  try {
    const dbListingData = await Listing.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],   
    });
    const listing = dbListingData.get({ plain: true });
    res.render('postedItems', { // individual product page
      listing,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/category/:id', async (req, res) => {
  try {
    const dbCategoryData = await Listing.findAll({
      where: {
        category_id: req.params.id,
      },
      include: [
        {
          model: { User, Category },
        },
      ],
    });
    const listings = dbCategoryData.map((listing) => 
      listing.get({ plain: true })
    );
    listings.reverse();
    res.render('category', {
      listings,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;