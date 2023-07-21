const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect('/');
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(500).send('Email must be unique!');
    } else if (err.name === 'SequelizeValidationError') {
      res.status(500).send('Password must be at least 8 characters long!');
    } else {
      res.status(500).send(err);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
  
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
  
  module.exports = router;
  
  