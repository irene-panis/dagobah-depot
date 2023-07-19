require('dotenv').config()
const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//cors allows the server to run 
const cors = require('cors');
app.use(express.json());
app.listen(3001, () => {
    console.log('server started on port 3001')
})
//im allowing the server 5500 to be read on my local host
app.use(cors({
    origin: 'http://localhost:5500'
}))
app.use(express.static("testing_materials"))
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn react Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today"}],
])

app.post("/create-checkout-session", async (req, res) => {
try{
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3001',

        // create a body for items so that the request can appear here when checking out
        line_items: req.body.items.map(item => {
            const storeItem = storeItems.get(item.id)
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
})
    res.json({ url: session.url })
} catch (e) {
    res.status(500).json({ error: e.message })
}
})



const sequelize = require('./config/connection');


const PORT = process.env.PORT || 3001;


/*
const sequelizeStore = require('connect-session-sequelize')(session.store);
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
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
// });