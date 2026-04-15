// const bcrypt = require("bcryptjs");
// const axios = require("axios");

// const User = require("../models/User");
// const Student = require("../models/Student");
// const Trainer = require("../models/Trainer");
// const Otp = require("../models/Otp");

// const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");


// // ─────────────────────────────────────────────
// // REGISTER STUDENT + SEND OTP
// // ─────────────────────────────────────────────
// exports.registerStudent = async (req, res) => {
//   try {

//     const {
//       name,
//       email,
//       phone,
//       password,
//       age,
//       gender,
//       studentType,
//       goal,
//       level,
//       workoutType,
//       preferredTime,
//       hasMedicalIssue,
//       medicalIssue
//     } = req.body;

//     // check existing email
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already registered"
//       });
//     }
// const existingPhone = await User.findOne({ phone });

// if (existingPhone) {
//   return res.status(400).json({
//     success: false,
//     message: "Phone already registered"
//   });
// }
//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create user
//     const newUser = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: "student"
//     });

//     const studentId = "STD-" + uuidv4().slice(0, 6).toUpperCase();

//     const profileImage = req.file ? req.file.filename : null;

//     // create student profile
//     await Student.create({
//       studentId,
//       userId: newUser._id,
//       age,
//       gender,
//       studentType,
//       goal,
//       level,
//       workoutType,
//       preferredTime,
//       hasMedicalIssue,
//       medicalIssue: hasMedicalIssue ? medicalIssue : null,
//       profileImage
//     });


//     // ───────────────── OTP GENERATE ─────────────────
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//     // await Otp.create({
//     //   phone,
//     //   otp: otpCode,
//     //   expiresAt: new Date(Date.now() + 5 * 60 * 1000)
//     // });


//     // ───────────────── SEND OTP (MSG91) ─────────────────
// const response = await axios.get(
//   `https://control.msg91.com/api/v5/otp?mobile=91${phone}&template_id=${process.env.MSG91_TEMPLATE_ID}`,
//   {
//     headers: {
//       authkey: process.env.MSG91_AUTH_KEY
//     }
//   }
// );

// console.log("MSG91 RESPONSE:", response.data);

//     return res.status(201).json({
//       success: true,
//       message: "Student registered. OTP sent successfully"
//     });

//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });

//   }
// };



// // ─────────────────────────────────────────────
// // VERIFY OTP + LOGIN
// // ─────────────────────────────────────────────
// exports.verifyStudentOtp = async (req, res) => {

//   try {

//     const { phone, enteredOtp } = req.body;

//     const otpData = await Otp.findOne({ phone });

//     if (!otpData) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP not found"
//       });
//     }

//     if (otpData.expiresAt < new Date()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired"
//       });
//     }

//     if (otpData.otp !== enteredOtp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP"
//       });
//     }

//     const user = await User.findOne({ phone });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }


//     // ───────────── GENERATE TOKEN ─────────────
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         role: user.role,
//         phone: user.phone
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );


//     let responseData = {
//       success: true,
//       message: "OTP verified successfully",
//       token,
//       role: user.role
//     };


//     // STUDENT DATA
//     if (user.role === "student") {

//       const student = await Student.findOne({ userId: user._id });

//       if (student) {

//         student.token = token;
//         await student.save();

//         responseData.studentId = student.studentId;

//       }

//     }


//     // TRAINER DATA
//     if (user.role === "trainer") {

//       const trainer = await Trainer.findOne({ userId: user._id });

//       if (trainer) {

//         trainer.token = token;
//         await trainer.save();

//         responseData.trainerId = trainer.trainerId;

//       }

//     }


//     // delete otp after success
//     await Otp.deleteMany({ phone });


//     return res.status(200).json(responseData);

//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     });

//   }

// };
// // exports.createPin = async (req, res) => {

// //   try {

// //     console.log("BODY:", req.body); // debugging

// //     const { phone, pin } = req.body;

// //     // validation
// //     if (!phone || !pin) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Phone and PIN are required"
// //       });
// //     }

// //     const user = await User.findOne({ phone });

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found"
// //       });
// //     }

// //     // bcrypt string only
// //     const hashedPin = await bcrypt.hash(pin.toString(), 10);

// //     user.pin = hashedPin;
// //     await user.save();

// //     return res.status(200).json({
// //       success: true,
// //       message: "PIN created successfully"
// //     });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error"
// //     });
// //   }
// // };


const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Student = require("../models/Student");
const Trainer = require("../models/Trainer");
const Otp = require("../models/Otp");

const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");


// ─────────────────────────────────────────────
// REGISTER STUDENT + GENERATE OTP
// ─────────────────────────────────────────────
exports.registerStudent = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      password,
      age,
      gender,
      studentType,
      goal,
      level,
      workoutType,
      preferredTime,
      hasMedicalIssue,
      medicalIssue
    } = req.body;

    // Check email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Check phone
    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "student"
    });

    const studentId = "STD-" + uuidv4().slice(0, 6).toUpperCase();

    const profileImage = req.file ? req.file.filename : null;

    // Create student profile
    await Student.create({
      studentId,
      userId: newUser._id,
      age,
      gender,
      studentType,
      goal,
      level,
      workoutType,
      preferredTime,
      hasMedicalIssue,
      medicalIssue: hasMedicalIssue ? medicalIssue : null,
      profileImage
    });

    // ───────────── GENERATE OTP ─────────────
    // const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpCode = "123456";

    // delete old otp
    await Otp.deleteMany({ phone });

    // save otp
    await Otp.create({
      phone,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    console.log("Generated OTP:", otpCode);

    return res.status(201).json({
      success: true,
      message: "Student registered. OTP generated successfully"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
exports.createPin = async (req, res) => {
  console.log(req.body);
  try {

    const { phone, pin } = req.body;

    // validation
    if (!phone || !pin) {
      return res.status(400).json({
        success: false,
        message: "Phone and PIN are required"
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // hash pin
    const hashedPin = await bcrypt.hash(pin.toString(), 10);

    // save pin
    user.pin = hashedPin;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "PIN created successfully"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};


// ─────────────────────────────────────────────
// VERIFY OTP + LOGIN
// ─────────────────────────────────────────────
exports.verifyStudentOtp = async (req, res) => {

  try {

    const { phone, enteredOtp } = req.body;

    const otpData = await Otp.findOne({ phone });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found"
      });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    if (otpData.otp !== String(enteredOtp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        phone: user.phone 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    let responseData = {
      success: true,
      message: "OTP verified successfully",
      token,
      role: user.role,
      name: user.name
    };

    // Student data
    if (user.role === "student") {

      const student = await Student.findOne({ userId: user._id });

      if (student) {

        student.token = token;
        await student.save();

        responseData.studentId = student.studentId;

      }

    }

    // Trainer data
    if (user.role === "trainer") {

      const trainer = await Trainer.findOne({ userId: user._id });

      if (trainer) {

        trainer.token = token;
        await trainer.save();

        responseData.trainerId = trainer.trainerId;

      }

    }

    // Delete OTP after success
    await Otp.deleteMany({ phone });

    return res.status(200).json(responseData);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};
