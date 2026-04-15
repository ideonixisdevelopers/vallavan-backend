const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Trainer = require('../models/Trainer');
const { generateOtp } = require('./otpController');
const { v4: uuidv4 } = require('uuid');   // install: npm install uuid

exports.registerTrainer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      age,
      gender,
      qualification,
      trainerType,
      availability,
      specializations,
      certified
    } = req.body;

    // 🔎 Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create User
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "trainer"
    });

    // 🆔 Generate Professional Trainer ID
    const trainerId = "TRN-" + uuidv4().slice(0, 6).toUpperCase();

    // 📂 Handle file uploads
    const profileImage = req.files?.profileImage
      ? req.files.profileImage[0].filename
      : null;

    const certificate = req.files?.certificate
      ? req.files.certificate[0].filename
      : null;

    // 🏋️ Create Trainer Profile
    await Trainer.create({
      trainerId,   // ✅ custom ID
      userId: newUser._id,
      age,
      gender,
      qualification,
      trainerType,
      availability,
      specializations: Array.isArray(specializations)
        ? specializations
        : [specializations],
      certified,
      profileImage,
      certificate,
      status: "pending"   // ✅ default pending approval
    });

    // 📱 Generate OTP
    await generateOtp(phone);

    res.status(201).json({
      success: true,
      message: "Trainer registered successfully. OTP sent.",
      
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  
  }
};
exports.getTrainerStatus = async (req, res) => {
    console.log(req.params, "PARAMS"); 
  try {
    const { trainerId } = req.params;

    const trainer = await Trainer.findOne({ trainerId });

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found"
      });
    }

    res.status(200).json({
      success: true,
      trainerId: trainer.trainerId,
      status: trainer.status
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};