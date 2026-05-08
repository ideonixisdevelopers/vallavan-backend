const Banner = require("../models/Banner");

/// ✅ CREATE BANNER
exports.createBanner = async (req, res) => {

  try {

    const banner = new Banner(req.body);

    const saved =
        await banner.save();

    res.json({
      success: true,
      data: saved,
    });

  } catch (e) {

    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};


/// ✅ GET ALL ACTIVE BANNERS
exports.getBanners = async (req, res) => {

  try {

    const banners = await Banner.find({
      active: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: banners,
    });

  } catch (e) {

    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};