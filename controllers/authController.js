const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
const Trainer = require('../models/Trainer');

exports.register = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      role
    } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create common user
    const newUser = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role
    });

    // 🔥 ROLE BASED SAVE
    if (role === "student") {
      await Student.create({
        userId: newUser._id,
        age: req.body.age,
        gender: req.body.gender,
        goal: req.body.goal
      });
    }

    if (role === "trainer") {
      await Trainer.create({
        userId: newUser._id,
        age: req.body.age,
        gender: req.body.gender,
        qualification: req.body.qualification,
        experience: req.body.experience
      });
    }

    res.status(201).json({
      success: true,
      message: `${role} registered successfully`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
