const router = require('express').Router();
const { User, Listing, Category } = require('../../models');

// post new item
router.post('/post', async (req, res) => {
  try {
    const newListing = await Listing.create({
      ...req.body,
      seller_id: req.session.user_id,
    });

    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete item
router.delete('/:id', async (req, res) => {
  try {
    console.log("delete request attempted");
    const listingData = await Listing.destroy({
      where: {
        id: req.params.id, 
        seller_id: req.session.user_id, // make sure we own the listing
      },
    });

    if (!listingData) {
      res.status(404).json({ message: 'No listing found with this id!' });
      return;
    }
    res.status(200).send(); // send ok status from server so js can refresh page
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
          model: User,
        },
        {
          model: Category,
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