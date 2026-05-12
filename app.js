const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const classRoutes = require("./routes/class.routes");
dotenv.config();      // 👈 FIRST
connectDB();          // 👈 SECOND

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node server running 🚀");
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/memberships", require("./routes/membershipRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/diets", require("./routes/dietRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/support", require("./routes/supportRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));

app.use("/api/agora", require("./routes/agora.routes"));
app.use('/api/student', require("./routes/studentRoutes"));
app.use('/uploads', express.static('uploads'));
app.use('/api/trainer', require('./routes/trainerRoutes'));
app.use("/api", classRoutes);
app.use("/api/workouts", require("./routes/workoutRoutes")); 
app.use("/api", require("./routes/bannerRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

module.exports = app;
