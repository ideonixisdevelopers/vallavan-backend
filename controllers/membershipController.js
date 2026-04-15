const Membership = require("../models/Membership");

// 🔹 Get All Membership Plans
exports.getMembershipPlans = async (req, res) => {
  try {
    const plans = await Membership.find({ isActive: true });
    console.log(plans,"TTTTT");

    return res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load membership plans",
    });
  }
};
