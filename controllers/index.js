const router = require('express').Router();

const apiRoutes = require('./api');
const projectRoutes = require('./projectRoutes.js');
const homeRoutes = require('./homeRoutes.js');

router.use('/', homeRoutes);
router.use('/', projectRoutes);
router.use('/api', apiRoutes);

module.exports = router;
