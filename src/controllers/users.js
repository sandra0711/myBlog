require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const renderSignUp = (req, res) => {
  res.render('register', { message: '' });
};
const renderSignIn = (req, res) => {
  res.render('login', { message: '' });
};

function serializeUser(user) {
  return { id: user.id, email: user.email };
}

const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const { saltRounds } = process.env;
      const hashPassword = await bcrypt.hash(password, Number(saltRounds));
      const newUser = new User({
        email,
        password: hashPassword,
      });
      await newUser.save();
      req.session.user = serializeUser(newUser);

      res.redirect('/posts');
    } catch (e) {
      res.render('register', { message: e });
    }
  } else {
    res.render('register', { message: 'Введите валидный email и пароль' });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        const validPass = await bcrypt.compare(password, user.password);
        if (validPass) {
          req.session.user = serializeUser(user);
          res.redirect('/posts');
        } else {
          res.render('login', { message: 'Неверный пароль' });
        }
      } else {
        res.render('login', { message: 'Пользователь в системе не зарегистрирован' });
      }
    } catch (e) {
      res.render('register', { message: e });
    }
  } else {
    res.render('login', { message: 'Введите валидный email и пароль' });
  }
};

const signOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new Error(err);
    }
    res.clearCookie('session cookie name');
    res.redirect('/');
  });
};

module.exports = {
  renderSignUp,
  signUp,
  renderSignIn,
  signIn,
  signOut,
};
