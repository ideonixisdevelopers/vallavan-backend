const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};
