require('dotenv').config();


const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

app.post('/register', async (req,res) => {
    try {
        const { email, password } = req.body

        const hashedPassword = await bycrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'User registered Successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registered user' });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: {email } });

        if(!User) {
            return res.status(401).json({error: 'Invalid email or password Young Padawan'});
        }

        const passwordMatch = await bycrypt.compare(password, user.password);
        if(!passwordMatch) {
            return(401).json({error: 'Invalid Email or password Young Padawan'});
        }

        //generate a jwt key 
        const token = jwt.sign({ userId: user.id }, 'secret key will go here when created irene', {expiresIn: '1h'});

        //sends the token to the client 
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error Logging in Young Padawan'});
    }
});

app.get('/protected', authenticateToken, (res, req) => {
    res.json({ message: 'You have access to this protected route' });
});

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({ error: 'Unauthorized '});
    }

    jwt.verify(token, ' secret key will go here when created irene', (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized '});
        }

        res.userId = decodedToken.userId;
        next();
    })
}



const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const items = require("./seeds/listingData");

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3001',
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