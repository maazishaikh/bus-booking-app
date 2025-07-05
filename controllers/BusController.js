const Bus = require('../models/Bus');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendConfirmationEmail } = require('../utils/mailer');

exports.homePage = (req, res) => {
  res.render('index', { session: req.session });
};

exports.searchBuses = async (req, res) => {
  const { from, to, date } = req.body;
  const buses = await Bus.find({ from, to, date });
  res.render('results', { buses, session: req.session });
};

exports.bookBus = async (req, res) => {
  const bus = await Bus.findById(req.body.busId);
  res.render('book', { bus });
};

exports.paymentPage = async (req, res) => {
  const { busId, seatCount, passengerName } = req.body;
  const bus = await Bus.findById(busId);
  const totalPrice = bus.price * seatCount;
  res.render('payment', { bus, seatCount, passengerName, totalPrice });
};

exports.confirmBooking = async (req, res) => {
  const { busId, passengerName, seatCount } = req.body;
  const bus = await Bus.findById(busId);
  const user = await User.findById(req.session.userId);
  const totalPrice = bus.price * seatCount;

  if (bus.seats >= seatCount) {
    bus.seats -= seatCount;
    await bus.save();

    const booking = await new Booking({
      user: user._id,
      bus: bus._id,
      passengerName,
      seatCount,
      totalPrice
    }).save();

    await sendConfirmationEmail(user.email, 'Booking Confirmation', `
      <h3>Hi ${passengerName},</h3>
      <p>Your booking for ${bus.name} from ${bus.from} to ${bus.to} is confirmed.</p>
      <p>Seats: ${seatCount} | Total Paid: ₹${totalPrice}</p>
    `);

    res.send(`
      <h2>Booking Confirmed!</h2>
      <p>Passenger: ${passengerName}</p>
      <p>Seats: ${seatCount}</p>
      <p>Total: ₹${totalPrice}</p>
      <a href="/my-bookings">My Bookings</a>
    `);
  } else {
    res.send('Not enough seats available.');
  }
};

exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.session.userId }).populate('bus');
  res.render('my-bookings', { bookings, session: req.session });
};
