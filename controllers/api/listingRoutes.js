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

module.exports = router;