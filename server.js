const express = require('express');
const session = require('expresss-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.store);

const app = express();
const PORT = process.env.port || 3001;

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

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});