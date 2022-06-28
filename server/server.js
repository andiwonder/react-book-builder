const next = require('next');
const express = require('express');
const mongoose = require('mongoose');
const mongoSessionStore = require('connect-mongo');

const session = require('express-session');
const User = require('./models/User');
require('dotenv').config();

const MongoStore = mongoSessionStore(session);
const MONGO_URL = process.env.MONGO_URL_TEST;
const dev = process.env.NODE_ENV !== 'production';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options);

const port = process.env.port || 8000;
const ROOT_URL = `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const sess = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      domain: 'localhost',
    },
  };

  server.use(session(sess));

  server.get('/', async (req, res) => {
    // const user = { email: 'skasliwal12@gmail.com' };
    req.session.foo = 'bar';
    const user = await User.findOne({ slug: 'skasliwal' });
    app.render(req, res, '/', { user });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
