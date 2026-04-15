// const Otp = require('../models/Otp');
// const fetch = require("node-fetch");
// // Generate OTP
// exports.generateOtp = async (phone) => {
//   const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

//   // Delete old OTP
//   await Otp.deleteMany({ phone });

//   await Otp.create({
//     phone,
//     otp: generatedOtp,
//     expiresAt: new Date(Date.now() + 5 * 60 * 1000)
//   });

//   console.log("Generated OTP:", generatedOtp);

//   return generatedOtp;
// };


// // Verify OTP
// exports.verifyOtp = async (req, res) => {
//   try {
//     const accessToken = req.body.accessToken;

//     const response = await fetch(
//       "https://control.msg91.com/api/v5/widget/verifyAccessToken",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           authkey: process.env.MSG91_AUTH_KEY,
//           "access-token": accessToken,
//         }),
//       }
//     );

//     const data = await response.json();

//     return res.json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "OTP verification failed" });
//   }
// };
const Otp = require('../models/Otp');

// Generate OTP
exports.generateOtp = async (phone) => {

  // const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const generatedOtp = "123456"; 

  // Delete old OTP
  await Otp.deleteMany({ phone });

  // Save new OTP
  await Otp.create({
    phone,
    otp: generatedOtp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
  });

  console.log("Generated OTP:", generatedOtp);

  return generatedOtp;
};


// Verify OTP
exports.verifyOtp = async (phone, enteredOtp) => {

  const existingOtp = await Otp.findOne({ phone });

  if (!existingOtp) {
    return { valid: false, message: "OTP not found" };
  }

  if (existingOtp.expiresAt < new Date()) {
    return { valid: false, message: "OTP expired" };
  }

  if (existingOtp.otp !== String(enteredOtp)) {
    return { valid: false, message: "Invalid OTP" };
  }

  // Delete OTP after verification
  await Otp.deleteMany({ phone });

  return { valid: true };
};