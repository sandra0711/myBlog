require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const dbConnect = require('./src/config/db');

const indexRoute = require('./src/routes/index');
const usersRoute = require('./src/routes/users');
const postRouter = require('./src/routes/posts');

const app = express();

app.set('trust proxy', 1); // trust first proxy
hbs.registerPartials(path.join(__dirname, 'src', '/views', '/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('session cookie name', 'sid');

app.use(session({
  name: 'session cookie name',
  store: new FileStore({
    secret: process.env.SESSION_SECRET,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/posts', postRouter);

const PORT = process.env.PORT || 3000;
dbConnect();

app.listen(PORT, () => console.log('Порт запущен по адресу: ', PORT));
