const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const isAdmin = require('../middleware/isAdmin');

router.get('/admin', isAdmin, async (req, res) => {
  const buses = await Bus.find();
  res.render('admin-dashboard', { buses, session: req.session });
});

router.get('/admin/add', isAdmin, (req, res) => {
  res.render('admin-add-bus');
});

router.post('/admin/add', isAdmin, async (req, res) => {
  const { name, from, to, date, time, seats, price } = req.body;
  await new Bus({ name, from, to, date, time, seats, price }).save();
  res.redirect('/admin');
});

router.post('/admin/delete/:id', isAdmin, async (req, res) => {
  await Bus.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
