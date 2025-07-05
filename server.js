require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();

mongoose.connect(process.env.MONGO_URI=mongodb://admin:secret@localhost:27017/?authSource=admin, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'busbookingsecretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI=mongodb://admin:secret@localhost:27017/?authSource=admin }),
  cookie: { maxAge: 1000 * 60 * 60 }
}));

const busRoutes = require('./routes/busRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', authRoutes);
app.use('/', busRoutes);
app.use('/', adminRoutes);

app.listen(3000, () => console.log('Server started on http://43.204.150.199:3000'));
