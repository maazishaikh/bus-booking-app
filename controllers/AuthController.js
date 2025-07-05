const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerPage = (req, res) => {
  res.render('register');
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await new User({ name, email, password: hashedPassword }).save();
    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res.redirect('/');
  } catch (err) {
    res.send('Error registering user');
  }
};

exports.loginPage = (req, res) => {
  res.render('login');
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res.redirect('/');
  } else {
    res.send('Invalid credentials');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};
