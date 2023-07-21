require('dotenv').config();


const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

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

app.use(routes);


const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const items = require("./seeds/listingData");

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://dagobah-depot-34081fe1df5e.herokuapp.com/checkout',
      cancel_url: '',
      // create a body for items so that the request can appear here when checking out
      line_items: req.body.items.map(item => {
        const storeItem = items.find(item => item.id === item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      }),
      payment_method_types: ['card'],
      mode: 'payment',
    });
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});