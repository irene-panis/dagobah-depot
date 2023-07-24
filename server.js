require('dotenv').config();


const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

const sequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static("images"));
app.use(express.static("js"));

app.use(routes);


const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const { Listing } = require('./models');


//post request to get the /checkout-session to the stripe page
app.post("/checkout-session", async (req, res) => {
  try {
    const items = req.body.items;
    const lineItems = [];
    const itemId = items[0];

    for (const item of items) {
      const listing = await Listing.findByPk(item.id);
      if (!listing) {
        throw new Error(`Listing with id ${item.id} not found.`);
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: listing.name
          },
          unit_amount: listing.price * 100 // Stripe expects the price in cents
        },
        quantity: item.quantity
      });
    }

    const session = await stripe.checkout.sessions.create({
      success_url: 'https://dagobah-depot-34081fe1df5e.herokuapp.com/',
      cancel_url: `https://dagobah-depot-34081fe1df5e.herokuapp.com/listings/${itemId}`,
      line_items: lineItems,
      payment_method_types: ['card'],
      mode: 'payment',
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening ${PORT}`));
});