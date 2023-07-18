const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// placeholder so we can get heroku to work - we can build up from this
router.get('/', async (req, res) => {
  res.render('homepage');
});

module.exports = router;
