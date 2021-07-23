const isUserExist = (req, res, next) => {
  if (req.session?.user) {
    next();
  } else {
    res.redirect('/users/signup');
  }
};

module.exports = isUserExist;
