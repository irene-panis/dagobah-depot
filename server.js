const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is now listening to port ${PORT}`));

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});