const express = require("express");

const router = express.Router();

const bannerController =
    require("../controllers/bannerController");


/// ✅ CREATE BANNER
router.post(
  "/banners",
  bannerController.createBanner,
);


/// ✅ GET BANNERS
router.get(
  "/banners",
  bannerController.getBanners,
);

module.exports = router;