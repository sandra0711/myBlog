require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const render = (req, res) => {
  res.render('register', { message: '' });
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

module.exports = {
  render,
  signUp,
};
